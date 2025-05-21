// apps/web/src/services/locationSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

/* ──────────────────────────────────────────────────────────────── */
/* Type returned by Booking.com’s locations endpoint               */
/* ──────────────────────────────────────────────────────────────── */
export interface LocationRow {
  dest_id: string;
  dest_type: string; // "city" | "country" | "district" | …
  name: string; // "Paris", "Italy", …
  label: string; // "Paris, Île-de-France, France"
}

/* ──────────────────────────────────────────────────────────────── */
/* Async thunk: resolve a human query → best matching destination  */
/* ──────────────────────────────────────────────────────────────── */
export const fetchFirstMatch = createAsyncThunk<
  LocationRow, // resolved value
  string, // search text
  { rejectValue: string }
>('locations/fetchFirstMatch', async (query, { rejectWithValue }) => {
  try {
    const res = await axios.get<LocationRow[]>(
      'https://booking-com.p.rapidapi.com/v1/hotels/locations',
      {
        params: { name: query, locale: 'en-gb' },
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? '',
        },
      },
    );

    if (res.data.length === 0) {
      return rejectWithValue('No matching destination found.');
    }

    /* Prefer a “city” result if available, else take the first row */
    const best = res.data.find((r) => r.dest_type === 'city') ?? res.data[0];

    return best;
  } catch (err) {
    const ax = err as AxiosError<{ message?: string }>;
    return rejectWithValue(ax.response?.data?.message ?? ax.message ?? 'Unknown error');
  }
});
