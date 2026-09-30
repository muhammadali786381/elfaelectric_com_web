import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { OrderStatus } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/components/admin/StatusBadge";
import { getOrder } from "@/actions/admin/orders";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

function formatRs(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

function formatEventTime(d: Date) {
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusDotClass(status: OrderStatus, isLatest: boolean) {
  if (!isLatest) {
    return "border-2 border-border bg-card";
  }
  switch (status) {
    case "DELIVERED":
      return "bg-primary";
    case "CANCELLED":
    case "HOLD":
      return "bg-amber-400";
    case "PROCESSING":
      return "bg-sky-400";
    default:
      return "bg-primary";
  }
}

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params;
  const result = await getOrder(id);
  if (!result.ok || !result.data) notFound();

  const order = result.data;
  const placed = formatEventTime(order.createdAt);
  const events = order.events ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/admin/orders">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <h1 className="font-montserrat text-2xl font-bold tracking-tight">
              Order {order.id}
            </h1>
            <p className="font-roboto text-sm text-muted-foreground">
              Placed on {placed}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <OrderStatusForm orderId={order.id} status={order.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-montserrat text-lg font-semibold">
              Customer details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-roboto text-xs text-muted-foreground">Name</p>
                <p className="font-roboto text-sm">
                  {order.shipFirstName} {order.shipLastName}
                </p>
              </div>
              <div>
                <p className="font-roboto text-xs text-muted-foreground">Email</p>
                <p className="font-roboto text-sm">{order.email}</p>
              </div>
              <div>
                <p className="font-roboto text-xs text-muted-foreground">Phone</p>
                <p className="font-roboto text-sm">{order.shipPhone}</p>
              </div>
              <div>
                <p className="font-roboto text-xs text-muted-foreground">
                  Shipping address
                </p>
                <p className="font-roboto text-sm">
                  {[
                    order.shipAddress1,
                    order.shipAddress2,
                    order.shipCity,
                    order.shipState,
                    order.shipPostcode,
                    order.shipCountry,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
              {order.note ? (
                <div className="sm:col-span-2">
                  <p className="font-roboto text-xs text-muted-foreground">
                    Order note
                  </p>
                  <p className="font-roboto text-sm">{order.note}</p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-montserrat text-lg font-semibold">Items</h2>
            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border border-border bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-roboto font-medium">{item.name}</p>
                      <p className="font-roboto text-xs text-muted-foreground">
                        {item.variantLabel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-roboto text-sm text-muted-foreground">
                      {item.qty} × {formatRs(item.price)}
                    </p>
                    <p className="font-roboto font-medium">
                      {formatRs(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between font-roboto text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatRs(order.subtotal)}</span>
              </div>
              {order.discount > 0 ? (
                <div className="flex justify-between font-roboto text-sm">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    Discount
                    {order.couponCode ? (
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {order.couponCode}
                      </Badge>
                    ) : null}
                  </span>
                  <span className="text-primary">
                    − {formatRs(order.discount)}
                  </span>
                </div>
              ) : null}
              {order.taxTotal > 0 ? (
                <div className="flex justify-between font-roboto text-sm text-muted-foreground">
                  <span>Tax</span>
                  <span>{formatRs(order.taxTotal)}</span>
                </div>
              ) : null}
              <div className="mt-2 flex justify-between border-t border-border pt-4 font-montserrat text-lg font-bold">
                <span>Total</span>
                <span>{formatRs(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="mb-6 font-montserrat text-lg font-semibold">
              Timeline
            </h2>
            {events.length === 0 ? (
              <p className="font-roboto text-sm text-muted-foreground">
                No status events yet.
              </p>
            ) : (
              <div className="relative flex flex-col gap-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                {events.map((event, index) => {
                  const isLatest = index === 0;
                  return (
                    <div key={event.id} className="relative flex gap-4">
                      <div
                        className={cn(
                          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                          statusDotClass(event.status, isLatest),
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            isLatest
                              ? "bg-primary-foreground"
                              : "bg-muted-foreground",
                          )}
                        />
                      </div>
                      <div className="pt-0.5">
                        <p className="font-roboto text-sm font-medium">
                          {event.note || `Status set to ${event.status}`}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <OrderStatusBadge status={event.status} />
                          <p className="font-roboto text-xs text-muted-foreground">
                            {formatEventTime(event.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="mb-6 font-montserrat text-lg font-semibold">
              Payment
            </h2>
            <div className="flex flex-col gap-3 font-roboto text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="capitalize">
                  {order.paymentMethod === "bacs"
                    ? "Bank transfer"
                    : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="capitalize">
                  {order.shippingMethod.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-muted-foreground">Status</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
