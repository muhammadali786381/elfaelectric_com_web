import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Package, Ticket, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/components/admin/StatusBadge";
import { getDashboardMetrics } from "@/actions/admin/dashboard";

const METRIC_ICONS = [Wallet, Package, CheckCircle2, Ticket];

export default async function AdminDashboard() {
  const result = await getDashboardMetrics();
  const metrics = result.ok ? result.data.metrics : [];
  const recent = result.ok ? result.data.recentOrders : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold tracking-tight">
            Overview
          </h1>
          <p className="mt-2 font-roboto text-sm text-muted-foreground">
            Store pulse — orders, today’s revenue, and promos.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/orders">
            View orders
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, i) => {
          const Icon = METRIC_ICONS[i] ?? Wallet;
          return (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-roboto text-sm text-muted-foreground">
                  {metric.label}
                </p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-3 font-montserrat text-3xl font-bold tracking-tight">
                {metric.value}
              </p>
              <p
                className={`mt-2 font-roboto text-xs ${
                  metric.hintTone === "success"
                    ? "text-primary"
                    : metric.hintTone === "warning"
                      ? "text-amber-400"
                      : "text-muted-foreground"
                }`}
              >
                {metric.hint}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-montserrat text-base font-semibold">
            Recent checkouts
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/orders">See all</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Customer</TableHead>
              <TableHead className="px-5">Order</TableHead>
              <TableHead className="px-5">Amount</TableHead>
              <TableHead className="px-5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  No orders yet.
                </TableCell>
              </TableRow>
            ) : (
              recent.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell className="px-5 text-muted-foreground">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell className="px-5">{order.total}</TableCell>
                  <TableCell className="px-5">
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
