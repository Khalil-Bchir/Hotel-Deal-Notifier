import { PrismaClient } from '@saas-monorepo/database';
import axios from 'axios';
// add at top
import { error } from 'console';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import fetch from 'node-fetch';

import { config } from '../config.js';
import { MAX_UPSTREAM_PAGES } from '../constants.js';
import {
  BookingResponse,
  DealCard,
  DestType,
  HotelRow,
  HotelSearchParams,
  LocationRow,
  PaginationMeta,
} from '../types/hotels.js';
import { AbstractServiceOptions } from '../types/services.js';

export class HotelsService {
  private prisma: PrismaClient;

  constructor({ prisma }: AbstractServiceOptions) {
    this.prisma = prisma;
  }

  /* ────────────────────────────────────────────────────────────── */
  /*  PUBLIC                                                       */
  /* ────────────────────────────────────────────────────────────── */

  /** Search Booking.com via RapidAPI and return *discounted* rows, paged **after** all filters */

  async searchLocation(location: string) {
    try {
      const res = await axios.get<LocationRow[]>(
        'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        {
          params: { name: location, locale: 'en-gb' },
          headers: {
            'x-rapidapi-host': 'booking-com.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? '',
          },
        },
      );

      if (res.data.length === 0) {
        throw error('No matching destination found.');
      }

      /* Prefer a “city” result if available, else take the first row */
      const best = res.data.find((r) => r.dest_type === 'city') ?? res.data[0];

      return best;
    } catch (error) {
      console.error('[HotelsService] ➜ searchLocation() error:', error);
      throw error;
    }
  }

  async searchDiscounted(params: HotelSearchParams): Promise<BookingResponse> {
    console.log('[HotelsService] ➜ searchDiscounted() called with params:', params);

    const pageIdx = Number(params.page_number ?? 0);
    const pageSize = Number(params.page_size ?? 10);
    console.log('[HotelsService]   pageIdx:', pageIdx, '| pageSize:', pageSize);

    /* 1 ▸ gather enough discounted rows to cover the requested page */
    const all = await this.gatherDiscounted(params, pageIdx, pageSize);
    console.log(`[HotelsService]   gathered ${all.length} discounted rows in total`);

    /* 2 ▸ slice & map to UI shape */
    const pageRows = this.paginate(all, pageIdx, pageSize).map((h) =>
      this.toDealCard(h, params.checkin_date, params.checkout_date),
    );
    console.log(`[HotelsService]   returning ${pageRows.length} rows for requested page`);

    /* 3 ▸ meta */
    const meta: PaginationMeta = {
      page: pageIdx,
      pageSize,
      totalResults: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / pageSize)),
      discountedOnPage: pageRows.length,
    };
    console.log('[HotelsService]   meta:', meta);

    return { meta, results: pageRows };
  }

  /* ────────────────────────────────────────────────────────────── */
  /*  PRIVATE HELPERS                                              */
  /* ────────────────────────────────────────────────────────────── */

  /** Fetch successive upstream pages until we have (pageIdx+1)*pageSize discounted rows */
  private async gatherDiscounted(
    baseParams: HotelSearchParams,
    pageIdx: number,
    pageSize: number,
  ): Promise<HotelRow[]> {
    const needed = (pageIdx + 1) * pageSize;
    console.log(
      `[HotelsService] ➜ gatherDiscounted() need ${needed} rows to satisfy page ${pageIdx}`,
    );

    const out: HotelRow[] = [];
    let upstreamPage = 0;

    while (out.length < needed && upstreamPage < MAX_UPSTREAM_PAGES) {
      const paramsForPage = { ...baseParams, page_number: String(upstreamPage) };
      const url = this.buildSearchUrl(paramsForPage);
      console.log(`[HotelsService]   🔗 fetching upstream page ${upstreamPage}: ${url.toString()}`);

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-rapidapi-host': config.rapidApiHost,
          'x-rapidapi-key': config.rapidApiKey,
        },
      });
      console.log(`[HotelsService]   ↳ status ${res.status}`);

      if (!res.ok) {
        const body = await res.text().catch(() => '<non-JSON body>');
        console.error('[HotelsService]   ❌ upstream error:', body);
        throw { status: res.status, body };
      }

      const data = (await res.json()) as { total_pages?: number; results: HotelRow[] };
      console.log(`[HotelsService]   ↳ received ${data.results.length} results`);

      /* keep only discounted rows (numeric discount or benefit badge) */
      const filtered = data.results.filter(this.isDiscounted);
      console.log(`[HotelsService]   ↳ ${filtered.length} passed discount filter`);

      out.push(...filtered);
      console.log(`[HotelsService]   ↳ accumulated ${out.length}/${needed}`);

      /* stop if upstream exhausted */
      upstreamPage += 1;
      const upstreamLast = data.total_pages !== undefined && upstreamPage >= data.total_pages;
      const upstreamEmpty = data.results.length === 0;

      if (upstreamLast || upstreamEmpty) {
        console.log('[HotelsService]   upstream exhausted — stopping fetch loop');
        break;
      }
    }

    return out;
  }

  /** Return only the slice that belongs to the requested page */
  private paginate<T>(rows: T[], pageIdx: number, pageSize: number): T[] {
    const start = pageIdx * pageSize;
    const slice = rows.slice(start, start + pageSize);
    console.log(`[HotelsService] ➜ paginate() returning rows[${start}…${start + pageSize})`);
    return slice;
  }

  /** Narrow `HotelRow` → the light `DealCard` used in the UI */
  private toDealCard(h: HotelRow, checkin: string, checkout: string): DealCard {
    const nights = Math.max(1, differenceInCalendarDays(parseISO(checkout), parseISO(checkin)));

    const grossTotal = h.priceBreakdown?.grossPrice?.value ?? 0;
    const nightly = grossTotal / nights;

    const strikeTot = h.priceBreakdown?.strikethroughPrice?.value ?? grossTotal;
    const discountPct =
      strikeTot > grossTotal && grossTotal > 0
        ? Math.round(((strikeTot - grossTotal) / strikeTot) * 100)
        : 0;

    return {
      id: h.id,
      name: h.name,
      location: { lat: h.latitude, lng: h.longitude, countryCode: h.countryCode },
      image: h.photoMainUrl,
      price: Number(nightly.toFixed(2)), // 👈 nightly price now
      currency: h.priceBreakdown?.grossPrice?.currency ?? 'USD',
      discountPct,
    };
  }

  /** TRUE if row has a numeric discount or at least one benefit badge */
  private isDiscounted(hotel: HotelRow): boolean {
    const pb = hotel.priceBreakdown;
    if (!pb) return false;

    const gross = pb.grossPrice.value;
    const strike = pb.strikethroughPrice?.value ?? 0;
    const numeric = strike > gross && gross > 0;
    const badge = Array.isArray(pb.benefitBadges) && pb.benefitBadges.length > 0;
    const pass = numeric || badge;

    console.log(`[HotelsService] ➜ isDiscounted(${hotel.id}) → ${pass}`);
    return pass;
  }

  /** Build the upstream RapidAPI URL for a single page (no price filters) */
  private buildSearchUrl(p: HotelSearchParams): URL {
    const {
      dest_id,
      dest_type = 'city',
      checkin_date,
      checkout_date,
      adults_number = '2',
      children_number = '0',
      children_ages = '',
      room_number = '1',
      filter_by_currency = 'USD',
      locale = 'en-gb',
      order_by = 'price',
      units = 'metric',
      page_number = '0',
      page_size = '25',
      include_adjacency = 'true',
    } = p;

    const url = new URL('https://booking-com.p.rapidapi.com/v2/hotels/search');

    url.searchParams.set('dest_id', dest_id);
    url.searchParams.set('dest_type', dest_type);
    url.searchParams.set('checkin_date', checkin_date);
    url.searchParams.set('checkout_date', checkout_date);
    url.searchParams.set('adults_number', adults_number);
    url.searchParams.set('room_number', room_number);
    url.searchParams.set('page_number', page_number);
    url.searchParams.set('page_size', page_size);
    url.searchParams.set('filter_by_currency', filter_by_currency);
    url.searchParams.set('locale', locale);
    url.searchParams.set('units', units);
    url.searchParams.set('order_by', order_by);
    url.searchParams.set('include_adjacency', include_adjacency);

    if (parseInt(children_number, 10) > 0 && children_ages) {
      url.searchParams.set('children_number', children_number);
      url.searchParams.set('children_ages', children_ages);
    }

    console.log('[HotelsService] ➜ buildSearchUrl()', url.toString());
    return url;
  }
}
