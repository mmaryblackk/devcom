import { useAppSelector } from "@/hooks/hooks";
import { CardActions } from "../CardActions";
import { Icon } from "../CardIcons/Icon";
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
    <Table className="text-2xl">
      <TableHeader>
        <TableRow>
          {HEADERS.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>
              <Icon>
                <img src={`/icons/${card.brand}.svg`} alt={card.brand}></img>
              </Icon>
            </TableCell>
            <TableCell>{card.last4}</TableCell>
            <TableCell>{card.isDefault && <Default />}</TableCell>
            <TableCell>
              <CardActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Default = () => (
  <RadioGroup defaultValue="default">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="default" id="default" />
      <Label htmlFor="default">Default</Label>
    </div>
  </RadioGroup>
);
