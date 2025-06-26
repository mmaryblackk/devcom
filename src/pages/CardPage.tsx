import CardFilter from "@/components/CardFilter";
import CardTable from "@/components/CardTable";
import CreateCardDialog from "@/components/CreateDialog";
import { init, remove, setDefault } from "@/features/cardsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";

export const CardPage = () => {
  const dispatch = useAppDispatch();
  const { cards, loading } = useAppSelector((state) => state.cards);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const filtered = cards.filter(
    (c) => c.brand.includes(filter.toLowerCase()) || c.last4.includes(filter)
  );
  return (
    <div className="p-8 min-w-2xl bg-white shadow">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-lg font-bold text-gray-900">My Cards</h1>
        <CardFilter filter={filter} setFilter={setFilter} />
      </div>
      <>
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No cards found</p>
        ) : (
          <CardTable
            data={filtered}
            onSetDefault={(id) => dispatch(setDefault(id))}
            onDelete={(id) => dispatch(remove(id))}
          />
        )}
      </>
      <div className="flex justify-end mt-4">
        <CreateCardDialog />
      </div>
    </div>
  );
};
