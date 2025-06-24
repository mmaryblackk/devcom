import { cardsSlice } from "@/features/cardsSlice";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices({
  cards: cardsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
