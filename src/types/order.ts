export interface OrderType {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: "buy" | "sell";
  match_id: string;
  remain : string;
  amount: string;
}
