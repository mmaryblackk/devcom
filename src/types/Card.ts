export type CardBrand = "visa" | "mastercard" | "amex";

export type Card = {
  id: string;
  brand: CardBrand;
  last4: string;
  isDefault: boolean;
};
