import type { Card } from "@/types/Card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { checkCardBrand } from "@/helpers/checkCardBrand";

type Props = {
  onSubmit: (card: Card) => void;
};

export const NewCard: React.FC<Props> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [errorCard, setErrorCard] = useState(false);

  const [date, setDate] = useState({
    month: "",
    year: "",
  });
  const [errorDate, setDateError] = useState({
    errorMonth: false,
    errorYear: false,
  });
  const [cvc, setCvc] = useState("");
  const [errorCvc, setErrorCvc] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const brand = checkCardBrand(cardNumber);

    const cardNumberValid = cardNumber.trim();
    const monthValid = date.month.trim();
    const yearValid = date.year.trim();
    const cvcValid = cvc.trim();

    setErrorCard(!cardNumberValid || !brand);
    setDateError({
      errorMonth: !monthValid,
      errorYear: !yearValid,
    });
    setErrorCvc(!cvcValid);

    if (!cardNumberValid || !brand || !monthValid || !yearValid || !cvcValid) {
      return;
    }

    onSubmit({
      id: "0",
      brand,
      last4: cardNumber.slice(-4),
      isDefault: false,
    });

    setCardNumber("");
    setDate({ month: "", year: "" });
    setCvc("");
    setErrorCard(false);
    setDateError({ errorMonth: false, errorYear: false });
    setErrorCvc(false);
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="!cursor-pointer text-lg"
          >
            Add New Card
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="card-number" className="font-semibold text-lg">
                Card Number
              </Label>
              <Input
                id="card-number"
                name="card-number"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  val = val.match(/.{1,4}/g)?.join(" ") || val;
                  setCardNumber(val);
                }}
              />
              {errorCard && <p>Error card number</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-lg">Expiraion Date</Label>
              <div className="flex flex-row gap-3">
                <div className="grid gap-2 w-24">
                  <Label htmlFor="month">Month</Label>
                  <Input
                    id="month"
                    name="month"
                    placeholder="MM"
                    value={date.month}
                    onChange={(event) =>
                      setDate({ ...date, month: event.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2 w-24">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    placeholder="YY"
                    value={date.year}
                    onChange={(event) =>
                      setDate({ ...date, year: event.target.value })
                    }
                  />
                </div>
                {(errorDate.errorMonth || errorDate.errorYear) && (
                  <p>Error date</p>
                )}
              </div>
            </div>
            <div className="grid gap-2 w-16">
              <Label htmlFor="cvc" className="font-semibold text-lg">
                CVC
              </Label>
              <Input
                id="cvc"
                name="cvc"
                type="password"
                placeholder="***"
                value={cvc}
                onChange={(event) => setCvc(event.target.value)}
              />
              {errorCvc && <p>Error cvc</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="!cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="!cursor-pointer">
              Add New Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
