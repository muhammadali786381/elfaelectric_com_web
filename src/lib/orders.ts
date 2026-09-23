/**
 * Local order store — swap for a database API later.
 * Shape is stable so an admin dashboard can read the same records.
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

const ORDERS_KEY = "elfa-orders-v1";

function readOrders(): CheckoutOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CheckoutOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: CheckoutOrder[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function generateOrderId() {
  const n = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ELFA-${n}-${r}`;
}

export function saveOrder(order: CheckoutOrder) {
  const all = readOrders();
  all.unshift(order);
  writeOrders(all);
  return order;
}

export function getOrders() {
  return readOrders();
}

export function getOrderById(id: string) {
  return readOrders().find((o) => o.id === id) ?? null;
}
