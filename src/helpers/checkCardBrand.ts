export function checkCardBrand(cardNumber: string) {
  switch (cardNumber[0]) {
    case "3":
      return "amex";
    case "4":
      return "visa";
    case "5":
      return "mastercard";
    default:
      return undefined;
  }
}
