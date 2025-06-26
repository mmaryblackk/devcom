import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchData } from "../helpers/fetchData";
import type { Card } from "@/types/Card";

type CardsState = {
  cards: Card[];
  loading: boolean;
  error: boolean;
};

const initialState: CardsState = {
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
    },
    setDefault: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.map((card) => ({
        ...card,
        isDefault: card.id === action.payload,
      }));
    },
    remove: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = false;
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
export const { add, setDefault, remove } = cardsSlice.actions;

export const init = createAsyncThunk("cards/fetch", () => {
  return fetchData<Card[]>("/api/cards.json");
});
