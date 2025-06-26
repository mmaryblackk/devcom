import { type ColumnDef } from "@tanstack/react-table";
import { type Card } from "@/types/Card";

export const getCardColumns = (
  onSetDefault: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Card>[] => [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("brand")}</span>
    ),
  },
  {
    accessorKey: "last4",
    header: "Last 4",
  },
  {
    accessorKey: "isDefault",
    header: "Default",
    cell: ({ row }) => (row.getValue("isDefault") ? "✅" : ""),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const card = row.original;
      return (
        <div className="flex gap-2">
          <button
            onClick={() => onSetDefault(card.id)}
            className="text-blue-500"
          >
            Set default
          </button>
          <button onClick={() => onDelete(card.id)} className="text-red-500">
            Delete
          </button>
        </div>
      );
    },
  },
];
