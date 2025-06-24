import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Card } from "@/types/Card";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/helpers/handleLocalStorage";

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
  reducers: {
    add: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
      saveToLocalStorage(state.cards);
    },
  },
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
export const { add } = cardsSlice.actions;

export const init = createAsyncThunk("cards/fetch", () => {
  return loadFromLocalStorage<Card[]>();
});
