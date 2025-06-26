import { DataTable } from "@/components/ui/data-table";
import { getCardColumns } from "./card-columns";
import { type Card } from "@/types/Card";

interface CardTableProps {
  data: Card[];
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

const CardTable: React.FC<CardTableProps> = ({
  data,
  onSetDefault,
  onDelete,
}) => {
  const columns = getCardColumns(onSetDefault, onDelete);
  return <DataTable columns={columns} data={data} />;
};

export default CardTable;
