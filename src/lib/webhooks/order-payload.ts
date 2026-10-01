import type { Order, OrderItem } from "@prisma/client";
import type { OrderCreatedWebhookPayload } from "@/lib/webhooks/types";

type OrderWithItems = Order & { items: OrderItem[] };

export function buildOrderCreatedPayload(
  order: OrderWithItems,
): OrderCreatedWebhookPayload {
  const billing =
    order.billingSameAsShipping || !order.billFirstName
      ? null
      : {
          firstName: order.billFirstName ?? "",
          lastName: order.billLastName ?? "",
          country: order.billCountry ?? "",
          address1: order.billAddress1 ?? "",
          address2: order.billAddress2 ?? "",
          city: order.billCity ?? "",
          state: order.billState ?? "",
          postcode: order.billPostcode ?? "",
          phone: order.billPhone ?? "",
        };

  return {
    event: "order.created",
    sentAt: new Date().toISOString(),
    order: {
      id: order.id,
      email: order.email,
      status: order.status,
      note: order.note,
      paymentMethod: order.paymentMethod,
      shippingMethod: order.shippingMethod,
      subtotal: order.subtotal,
      discount: order.discount,
      taxTotal: order.taxTotal,
      shippingTotal: order.shippingTotal,
      total: order.total,
      couponCode: order.couponCode,
      billingSameAsShipping: order.billingSameAsShipping,
      shipping: {
        firstName: order.shipFirstName,
        lastName: order.shipLastName,
        country: order.shipCountry,
        address1: order.shipAddress1,
        address2: order.shipAddress2,
        city: order.shipCity,
        state: order.shipState,
        postcode: order.shipPostcode,
        phone: order.shipPhone,
      },
      billing,
      items: order.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        variantLabel: item.variantLabel,
        price: item.price,
        tax: item.tax,
        image: item.image,
        qty: item.qty,
      })),
      createdAt: order.createdAt.toISOString(),
    },
  };
}
