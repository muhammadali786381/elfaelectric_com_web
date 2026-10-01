"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
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
import AdminPagination from "@/components/admin/AdminPagination";
import {
  listWebhookLogs,
  type WebhookLogView,
} from "@/actions/admin/webhooks";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 20;

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function WebhookLogsPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const debouncedOrder = useDebouncedValue(orderQuery, 350);
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState<WebhookLogView[]>([]);
  const [total, setTotal] = useState(0);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await listWebhookLogs({
        orderId: debouncedOrder,
        page,
        pageSize: PAGE_SIZE,
      });
      if (result.ok) {
        setLogs(result.data.items);
        setTotal(result.data.total);
      }
    });
  }, [debouncedOrder, page]);

  function onQueryChange(value: string) {
    setOrderQuery(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <Button asChild variant="outline" size="icon" className="mt-1 shrink-0">
            <Link href="/admin/webhooks">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to webhooks</span>
            </Link>
          </Button>
          <div>
            <h1 className="font-montserrat text-3xl font-bold tracking-tight">
              Webhook logs
            </h1>
            <p className="mt-2 font-roboto text-sm text-muted-foreground">
              Delivery attempts for <code className="text-foreground">order.created</code>.
              Search by order ID to see if a notification was sent or failed.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={orderQuery}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by order ID…"
              className="bg-background pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Time</TableHead>
              <TableHead className="px-5">Order</TableHead>
              <TableHead className="px-5">Endpoint</TableHead>
              <TableHead className="px-5">Result</TableHead>
              <TableHead className="px-5">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  {pending
                    ? "Loading logs…"
                    : "No webhook deliveries match your search."}
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="px-5 text-sm text-muted-foreground whitespace-nowrap">
                    {formatWhen(log.createdAt)}
                  </TableCell>
                  <TableCell className="px-5">
                    <Button asChild variant="link" className="h-auto p-0 font-mono text-xs">
                      <Link href={`/admin/orders/${log.orderId}`}>{log.orderId}</Link>
                    </Button>
                  </TableCell>
                  <TableCell className="max-w-[240px] px-5">
                    <div className="flex flex-col gap-0.5">
                      {log.endpointLabel ? (
                        <span className="text-sm font-medium">{log.endpointLabel}</span>
                      ) : null}
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {log.endpointUrl}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5">
                    <span
                      className={
                        log.success
                          ? "font-medium text-emerald-500"
                          : "font-medium text-destructive"
                      }
                    >
                      {log.success ? "Sent" : "Failed"}
                    </span>
                    {log.httpStatus != null ? (
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        HTTP {log.httpStatus}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="max-w-[280px] px-5 text-sm text-muted-foreground">
                    {log.success ? "—" : log.error || "Unknown error"}
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
