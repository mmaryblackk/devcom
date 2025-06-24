import { useState } from "react";
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
import { cardBrand } from "@/helpers/cardBrand";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import type { Card } from "@/types/Card";
import { add } from "@/features/cardsSlice";
import { cardSchema, type CardFormData } from "@/helpers/cardSchema";

export const NewCard = () => {
  const { cards } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<
    Partial<Record<keyof CardFormData, string>>
  >({});
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData: CardFormData = {
      cardNumber,
      date,
      cvc,
    };

    const result = cardSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CardFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof CardFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const brand = cardBrand(cardNumber);
    if (brand === undefined) return;

    const newCard: Card = {
      id: String(cards.length + 1),
      brand,
      last4: cardNumber.slice(-4),
      isDefault: false,
    };
    dispatch(add(newCard));
    setCardNumber("");
    setDate("");
    setCvc("");
    setErrors({});
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline" className="!cursor-pointer text-lg">
            Add New Card
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="card-number">Name</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  name="card-number"
                  placeholder="1234 1234 1234 1234"
                  className="pr-10"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  required
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  {cardNumber && (
                    <img
                      src={`/icons/${cardBrand(cardNumber)}.svg`}
                      width="20px"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="expiration-date">Expiration Date</Label>
              <Input
                id="expiration-date"
                name="expiration-date"
                placeholder="MM / YY"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                name="cvc"
                placeholder="***"
                type="password"
                value={cvc}
                onChange={(event) => setCvc(event.target.value)}
                required
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cvc}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="!cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="!cursor-pointer">
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
