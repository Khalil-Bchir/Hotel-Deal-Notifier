// apps/web/src/services/hotelSlice.ts
import api from '@/lib/api';
import type { RootState } from '@/services/store';
import type {
  BookingResponse,
  DealCard,
  HotelSearchParams,
  PaginationMeta,
} from '@/types/v1/hotels';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// your pre-configured Axios instance
import axios, { AxiosError } from 'axios';

/* ------------------------------------------------------------------ */
/* Async thunk                                                        */
/* ------------------------------------------------------------------ */

/**
 * Fetch discounted hotels.
 * - Uses GET (the backend route accepts query-string params)
 * - Cleans undefined / empty values before sending.
 */
export const fetchHotels = createAsyncThunk<
  BookingResponse, // resolved value
  HotelSearchParams, // thunk argument
  { rejectValue: string } // error payload
>('hotels/fetchHotels', async (params, { rejectWithValue }) => {
  // Remove undefined / null / empty-string keys so the query is clean
  const cleaned: Record<string, string> = Object.fromEntries(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => [k, String(v)]),
  );

  try {
    // Axios auto-serialises `params` into the query-string
    const res = await api.get<BookingResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/hotels/fetch`, {
      params: cleaned,
    });
    return res.data; // <<-- BookingResponse already typed
  } catch (err) {
    const axErr = err as AxiosError<{ message?: string }>;
    // Prefer server-supplied message, then Axios message
    const msg =
      axErr.response?.data?.message ??
      axErr.response?.statusText ??
      axErr.message ??
      'Unknown error';
    return rejectWithValue(msg);
  }
});

/* ------------------------------------------------------------------ */
/* Slice state                                                        */
/* ------------------------------------------------------------------ */

interface HotelsState {
  data: DealCard[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  lastParams: HotelSearchParams | null;
}

const initialState: HotelsState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
  lastParams: null,
};

/* ------------------------------------------------------------------ */
/* Slice                                                              */
/* ------------------------------------------------------------------ */

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    /** Optionally store the most recent search params so you can re-trigger later */
    setLastParams(state, action: PayloadAction<HotelSearchParams | null>) {
      state.lastParams = action.payload;
    },
    /** Clear all data (e.g. when user changes destination) */
    resetHotels() {
      return initialState; // simpler than Object.assign
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.results;
        state.meta = payload.meta;
      })
      .addCase(fetchHotels.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ?? error.message ?? 'Unknown error';
      });
  },
});

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */

export const { setLastParams, resetHotels } = hotelSlice.actions;
export default hotelSlice.reducer;

/* Selectors */
export const selectHotels = (s: RootState) => s.hotels.data;
export const selectHotelsMeta = (s: RootState) => s.hotels.meta;
export const selectHotelsLoading = (s: RootState) => s.hotels.loading;
export const selectHotelsError = (s: RootState) => s.hotels.error;
