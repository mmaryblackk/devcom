export const cardBrand = (cardNumber: string) => {
  if (cardNumber[0] === "3") {
    return "amex";
  }
  if (cardNumber[0] === "4") {
    return "visa";
  }
  if (cardNumber[0] === "5") {
    return "mastercard";
  }
  return undefined;
};
