/* ------------------------- SEARCH PARAMS ------------------------- */
export interface HotelSearchParams {
  dest_id: string;
  dest_type?: DestType;
  checkin_date: string; // YYYY-MM-DD
  checkout_date: string; // YYYY-MM-DD
  adults_number?: string;
  children_number?: string;
  children_ages?: string;
  room_number?: string;
  filter_by_currency?: string;
  locale?: string;
  order_by?: string;
  units?: string;

  page_number?: string; // default “0”  (0-based)
  page_size?: string; // default “25”
  include_adjacency?: string;

  /* price filter */
  price_filter_currencycode?: string;
  price_filter_min?: string;
  price_filter_max?: string;
}

export type DestType =
  | 'city'
  | 'attraction'
  | 'country'
  | 'district'
  | 'region'
  | 'airport'
  | 'hotel';

/* ----------------------- UPSTREAM SHAPES ------------------------ */
export interface PriceBand {
  min?: number;
  max?: number;
}
/* ---------- PRICES & BADGES ---------- */
export interface PriceValue {
  value: number; // 30.09
  currency: string; // "USD"
}

export interface BenefitBadge {
  identifier: string; // "Mobile Rate"
  text: string; // "Mobile-only price"
  explanation: string; // "Mobile-only price"
  variant: string; // "constructive"
}

export interface PriceBreakdown {
  grossPrice: PriceValue;
  strikethroughPrice?: PriceValue;
  benefitBadges?: BenefitBadge[];
}

/* ---------- TIME WINDOWS ---------- */
export interface TimeWindow {
  fromTime: string; // "14:00"
  untilTime: string; // "22:00"
}

/* ---------- WISHLIST TOGGLE ---------- */
export interface WishlistToggle {
  wishlistName: string; // "Prague"
  destinationId: string; // "city::-553173"
  propertyId: number; // 8130737
}

/* ---------- DISPLAY (priceDetails) ---------- */
export interface PriceDetails {
  info: string; // "Price for 1 night, 2 adults"
  strikethrough: string; // "‎US$33 ‬"
  gross: string; // "‎US$30‬"
  taxInfo: string; // "Includes taxes and charges"
}

/* ---------- MAIN ROW ---------- */
export interface HotelRow {
  /* basic identity */
  id: number;
  name: string;
  propertyType: string; // "Economy flat 18 minutes from Vaclavske namesti"

  /* media */
  mainPhotoId: number;
  photoMainUrl: string;
  photoUrls: string[];

  /* list position */
  position: number;
  rankingPosition: number;

  /* geo */
  countryCode: string; // "cz"
  latitude: number;
  longitude: number;

  /* price */
  currency: string; // row-level currency ("EUR")
  priceBreakdown: PriceBreakdown;
  priceDetails: PriceDetails;

  /* stay dates */
  checkinDate: string; // "2025-10-14"
  checkoutDate: string; // "2025-10-15"
  checkin: TimeWindow;
  checkout: TimeWindow;

  /* reviews */
  reviewScore: number; // 5.8
  reviewScoreWord: string; // "Okay"
  reviewCount: number; // 169

  /* misc ranking / quality */
  qualityClass: number; // 3
  isFirstPage: boolean; // true
  accuratePropertyClass: number; // 0
  propertyClass: number; // 0
  ufi: number; // -553173

  /* wishlist */
  wishlistName: string;
  optOutFromGalleryChanges: number; // 0
  wishlistToggle: WishlistToggle;

  /* accommodation */
  proposedAccommodation: string[]; // ["2 beds in dormitories", ": 2 beds"]

  /* extra labels that vary per row */
  additionalLabels: unknown[]; // keep flexible in case schema drifts
}

/* -------------------------- API OUTPUT -------------------------- */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalResults: number; // ALL rows (discounted + non-discounted)
  totalPages: number;
  discountedOnPage: number; // length of `results`
}

export interface BookingResponse {
  meta: PaginationMeta;
  results: DealCard[]; // swapped out
}

export interface DealCard {
  id: number;
  name: string;
  location: { lat: number; lng: number; countryCode: string };
  image: string; // main photo
  price: number; // gross value
  currency: string;
  discountPct: number; // rounded 0-100
}
