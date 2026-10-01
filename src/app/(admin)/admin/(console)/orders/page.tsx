"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/components/admin/StatusBadge";
import AdminPagination from "@/components/admin/AdminPagination";
import { listOrders, type OrderListItem } from "@/actions/admin/orders";
import type { OrderStatus } from "@/components/admin/mock-data";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 20;

const STATUS_FILTERS: Array<{ value: OrderStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "HOLD", label: "Hold" },
  { value: "PROCESSING", label: "Processing" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await listOrders({
        query: debouncedQuery,
        status,
        page,
        pageSize: PAGE_SIZE,
      });
      if (result.ok) {
        setOrders(result.data.items);
        setTotal(result.data.total);
      }
    });
  }, [debouncedQuery, status, page]);

  function onQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function onStatusChange(value: OrderStatus | "ALL") {
    setStatus(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold tracking-tight">
          Orders
        </h1>
        <p className="mt-2 font-roboto text-sm text-muted-foreground">
          Manage checkouts, holds, and deliveries.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by order ID, name, or email…"
              className="bg-background pl-9"
            />
          </div>

          <div className="relative w-full sm:w-[200px]">
            <label htmlFor="order-status-filter" className="sr-only">
              Filter by status
            </label>
            <select
              id="order-status-filter"
              value={status}
              onChange={(e) =>
                onStatusChange(e.target.value as OrderStatus | "ALL")
              }
              className="h-10 w-full appearance-none rounded-md border border-input bg-background py-2 pr-9 pl-3 font-roboto text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {STATUS_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Order ID</TableHead>
              <TableHead className="px-5">Customer</TableHead>
              <TableHead className="px-5">Date</TableHead>
              <TableHead className="px-5">Total</TableHead>
              <TableHead className="px-5">Status</TableHead>
              <TableHead className="px-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  {pending ? "Loading orders…" : "No orders match your filters."}
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 font-medium">{order.id}</TableCell>
                  <TableCell className="px-5">
                    <div className="flex flex-col">
                      <span>{order.customer}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell className="px-5">{order.total}</TableCell>
                  <TableCell className="px-5">
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="px-5 text-right">
                    <Button asChild variant="link" className="h-auto p-0 text-primary">
                      <Link href={`/admin/orders/${order.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <AdminPagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          pending={pending}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
