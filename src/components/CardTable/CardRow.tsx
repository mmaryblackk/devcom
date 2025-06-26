import type { Card } from "@/types/Card";
import { TableCell, TableRow } from "../ui/table";
import { Icon } from "../CardIcons/Icon";
import { CardActions } from "./CardActions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type Props = {
  card: Card;
};

export const CardRow: React.FC<Props> = ({ card }) => (
  <TableRow>
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
);

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
