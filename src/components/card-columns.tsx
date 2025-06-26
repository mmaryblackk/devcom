import { type ColumnDef } from "@tanstack/react-table";
import { type Card } from "@/types/Card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Check, Trash } from "lucide-react";

export const getCardColumns = (
  onSetDefault: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Card>[] => [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <img
        className="w-10"
        src={`/icons/${row.getValue("brand")}.svg`}
        alt={row.getValue("brand")}
      />
    ),
  },
  {
    accessorKey: "last4",
    header: "Last 4",
  },
  {
    accessorKey: "isDefault",
    header: "Default",
    cell: ({ row }) => (row.getValue("isDefault") ? "✅ Default" : ""),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const card = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border-1 rounded-md">
            <DropdownMenuItem
              onClick={() => onSetDefault(card.id)}
              className="cursor-pointer"
            >
              <Check className="mr-2 h-4 w-4 text-blue-500" />
              <span>Set default</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(card.id)}
              className="cursor-pointer text-red-500 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
