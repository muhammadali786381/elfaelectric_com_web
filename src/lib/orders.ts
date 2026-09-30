/**
 * Shared checkout types + order id helper.
 * Persistence lives in Postgres via server actions.
 */

export type CheckoutAddress = {
  firstName: string;
  lastName: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
};

export type CheckoutLineItem = {
  id: string;
  name: string;
  variantLabel: string;
  price: number;
  tax: number;
  image: string;
  qty: number;
};

export type CheckoutOrder = {
  id: string;
  createdAt: string;
  status: "pending_payment" | "paid" | "cancelled";
  email: string;
  shipping: CheckoutAddress;
  billingSameAsShipping: boolean;
  billing: CheckoutAddress | null;
  note: string;
  paymentMethod: "bacs";
  shippingMethod: "free_shipping";
  items: CheckoutLineItem[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  taxTotal: number;
  shippingTotal: number;
  total: number;
};

export const PK_STATES = [
  "Azad Kashmir",
  "Balochistan",
  "FATA",
  "Gilgit Baltistan",
  "Islamabad Capital Territory",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Sindh",
] as const;

export function generateOrderId() {
  const n = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ELFA-${n}-${r}`;
}
