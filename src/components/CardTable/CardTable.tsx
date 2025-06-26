import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { NewCard } from "../NewCard";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CardRow } from "./CardRow";
import type { Card } from "@/types/Card";
import { add } from "@/features/cardsSlice";

const HEADERS = ["Brand", "Last 4", "Default", "Action"];

export const CardTable = () => {
  const { cards } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();

  const addNewCard = (card: Card) => dispatch(add(card));

  return (
    <div className="bg-white p-6 shadow flex flex-col gap-2">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">My cards</h2>
        <Input type="text" placeholder="Search..." className="max-w-3xs" />
      </div>
      <Table className="text-2xl w-2xl">
        <TableHeader>
          <TableRow>
            {HEADERS.map((header) => (
              <TableHead key={header} className="font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.length > 0 ? (
            cards.map((card) => <CardRow key={card.id} card={card} />)
          ) : (
            <TableRow>
              <TableCell className="py-4 text-lg">No cards added</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <NewCard onSubmit={addNewCard} />
      </div>
    </div>
  );
};
