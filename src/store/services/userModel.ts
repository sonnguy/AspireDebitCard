export interface UserModal {
  id: number;
  cardName: string;
  cardNumber: string;
  cardExpireDate: string;
  cardCVV: string;
  weeklySpendingLimit: number;
  weeklySpendingLimitOn: boolean;
  freezeCard: boolean;
  balanceNumber: number;
  payed: number;
}
