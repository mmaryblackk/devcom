import { DataTable } from "@/components/ui/data-table";
import { getCardColumns } from "./card-columns";
import { type Card } from "@/types/Card";
import { useAppDispatch } from "@/hooks/hooks";
import { remove, setDefault } from "@/features/cardsSlice";

interface CardTableProps {
  data: Card[];
}

const CardTable: React.FC<CardTableProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const onSetDefault = (id: string) => dispatch(setDefault(id));
  const onDelete = (id: string) => dispatch(remove(id));

  const columns = getCardColumns(onSetDefault, onDelete);
  return <DataTable columns={columns} data={data} />;
};

export default CardTable;
