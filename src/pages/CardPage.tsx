import { CardTable } from "@/components/CardTable";
import { init as initCards } from "@/features/cardsSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useEffect } from "react";

export const CardPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initCards());
  }, [dispatch]);
  return <CardTable />;
};
