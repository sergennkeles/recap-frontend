export class CreditCard {
  id: number;
  customerId: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: number;
}

export class CartSummary {
  customerId: number;
  cartTotal: number;
}