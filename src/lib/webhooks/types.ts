import { z } from "zod";

/** HTTPS-only outbound webhook URL (admin-configured). */
export const webhookUrlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .refine((url) => url.startsWith("https://"), "Webhook URL must use HTTPS");

export type OrderCreatedWebhookPayload = {
  event: "order.created";
  sentAt: string;
  order: {
    id: string;
    email: string;
    status: string;
    note: string;
    paymentMethod: string;
    shippingMethod: string;
    subtotal: number;
    discount: number;
    taxTotal: number;
    shippingTotal: number;
    total: number;
    couponCode: string | null;
    billingSameAsShipping: boolean;
    shipping: {
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
    billing: {
      firstName: string;
      lastName: string;
      country: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      postcode: string;
      phone: string;
    } | null;
    items: Array<{
      productId: string;
      name: string;
      variantLabel: string;
      price: number;
      tax: number;
      image: string;
      qty: number;
    }>;
    createdAt: string;
  };
};
