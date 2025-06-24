import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../helpers/fetchData";
import type { Card } from "@/types/Card";

type ProductsState = {
  cards: Card[];
  loading: boolean;
  error: boolean;
};

const initialState: ProductsState = {
  cards: [],
  loading: false,
  error: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default cardsSlice.reducer;

export const init = createAsyncThunk("cards/fetch", () => {
  return fetchData<Card[]>("/api/cards.json");
});
