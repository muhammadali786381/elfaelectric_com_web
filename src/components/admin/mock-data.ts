export type OrderStatus =
  | "PENDING"
  | "HOLD"
  | "DELIVERED"
  | "CANCELLED"
  | "PROCESSING";

export type CouponStatus = "ACTIVE" | "EXHAUSTED" | "INACTIVE";

export type CouponType = "FIXED_AMOUNT" | "PERCENTAGE";

export type Coupon = {
  id: string;
  code: string;
  type: CouponType;
  value: string;
  uses: number;
  /** -1 means unlimited */
  maxUses: number;
  status: CouponStatus;
  /** Numeric amount for form editing (PKR or percent) */
  amount: number;
};
