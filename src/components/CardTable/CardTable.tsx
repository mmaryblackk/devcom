import { useAppSelector } from "@/hooks/hooks";
import { CardActions } from "../CardActions";
import { Icon } from "../CardIcons/Icon";
import { NewCard } from "../NewCard";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const HEADERS = ["Brand", "Last 4", "Default", "Action"];

export const CardTable = () => {
  const { cards } = useAppSelector((state) => state.cards);
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
            cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="min-w-24">
                  <Icon>
                    <img src={`/icons/${card.brand}.svg`} alt={card.brand} />
                  </Icon>
                </TableCell>
                <TableCell>{card.last4}</TableCell>
                <TableCell>{card.isDefault && <Default />}</TableCell>
                <TableCell>
                  <CardActions />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="py-4 text-lg">No cards added</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <NewCard />
      </div>
    </div>
  );
};

const Default = () => (
  <RadioGroup defaultValue="default">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="default" id="default" />
      <Label htmlFor="default" className="text-2xl">
        Default
      </Label>
    </div>
  </RadioGroup>
);
