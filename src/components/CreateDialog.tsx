/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { type Card } from "@/types/Card";
import { cn } from "@/lib/utils";
import { cardSchema } from "@/helpers/validationSchema";
import { add } from "@/features/cardsSlice";

const CreateCardDialog: React.FC = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiredMonth, setExpiredMonth] = useState("");
  const [expiredYear, setExpiredYear] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    const rawNumber = cardNumber.replace(/\s/g, "");
    const data = {
      cardNumber: rawNumber,
      expiredMonth,
      expiredYear,
      cvcNumber,
    };

    const result = cardSchema.safeParse(data);

    if (!result.success) {
      const formErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          formErrors[err.path[0]] = err.message;
        }
      });
      setErrors(formErrors);
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      brand: detectBrand(rawNumber),
      last4: rawNumber.slice(-4),
      isDefault: false,
    };

    dispatch(add(newCard));
    reset();
  };

  const reset = () => {
    setCardNumber("");
    setExpiredMonth("");
    setExpiredYear("");
    setCvcNumber("");
    setErrors({});
    setOpen(false);
  };

  const detectBrand = (num: string): Card["brand"] => {
    if (num.startsWith("4")) return "visa";
    if (num.startsWith("5")) return "mastercard";
    if (num.startsWith("3")) return "amex";
    return "visa";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-gray-600 rounded-md text-white px-4 py-2 cursor-pointer">
        Add New Card
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Add New Card</DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Card Number</label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                val = val.match(/.{1,4}/g)?.join(" ") || val;
                setCardNumber(val);
                if (errors.cardNumber) {
                  setErrors((prev) => {
                    const { cardNumber, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              className={cn(
                "border p-2 w-full rounded",
                errors.cardNumber && "border-red-500"
              )}
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Expiration Date</label>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <input
                  type="text"
                  placeholder="MM"
                  value={expiredMonth}
                  onChange={(e) => {
                    setExpiredMonth(e.target.value);
                    if (errors.expiredMonth) {
                      setErrors((prev) => {
                        const { expiredMonth, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  className={cn(
                    "border p-2 rounded",
                    errors.expiredMonth && "border-red-500"
                  )}
                  maxLength={2}
                />
                {errors.expiredMonth && (
                  <p className="text-red-500 text-sm">{errors.expiredMonth}</p>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <input
                  type="text"
                  placeholder="YY"
                  value={expiredYear}
                  onChange={(e) => {
                    setExpiredYear(e.target.value);
                    if (errors.expiredYear) {
                      setErrors((prev) => {
                        const { expiredYear, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  className={cn(
                    "border p-2 rounded",
                    errors.expiredYear && "border-red-500"
                  )}
                  maxLength={2}
                />
                {errors.expiredYear && (
                  <p className="text-red-500 text-sm">{errors.expiredYear}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">CVC</label>
            <input
              type="text"
              placeholder="***"
              value={cvcNumber}
              onChange={(e) => {
                setCvcNumber(e.target.value);
                if (errors.cvcNumber) {
                  setErrors((prev) => {
                    const { cvcNumber, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              className={cn(
                "border p-2 w-1/3 rounded",
                errors.cvcNumber && "border-red-500"
              )}
              maxLength={3}
            />
            {errors.cvcNumber && (
              <p className="text-red-500 text-sm">{errors.cvcNumber}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <button
              onClick={reset}
              className="border px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleAdd}
            className="bg-gray-600 rounded-md text-white px-4 py-2 cursor-pointer"
          >
            Add New Card
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCardDialog;
