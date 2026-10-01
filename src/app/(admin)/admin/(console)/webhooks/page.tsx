"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { Plus, ScrollText, Trash2, Webhook } from "lucide-react";
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
import {
  createWebhook,
  deleteWebhook,
  listWebhooks,
  updateWebhook,
  type WebhookView,
} from "@/actions/admin/webhooks";

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function WebhooksPage() {
  const [rows, setRows] = useState<WebhookView[]>([]);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function load() {
    startTransition(async () => {
      const result = await listWebhooks();
      if (result.ok) setRows(result.data);
    });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createWebhook({ url, label });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setUrl("");
      setLabel("");
      setRows((prev) => [result.data, ...prev]);
    });
  }

  function onToggle(row: WebhookView) {
    startTransition(async () => {
      const result = await updateWebhook(row.id, { enabled: !row.enabled });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === row.id ? result.data : r)));
    });
  }

  function onDelete(id: string) {
    if (!confirm("Remove this webhook?")) return;
    startTransition(async () => {
      const result = await deleteWebhook(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold tracking-tight">
            Webhooks
          </h1>
          <p className="mt-2 max-w-2xl font-roboto text-sm text-muted-foreground">
            Send order details to a third-party URL when a checkout completes.
            Paste an HTTPS endpoint; we POST a JSON{" "}
            <code className="text-foreground">order.created</code> payload.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/webhooks/logs">
            <ScrollText className="mr-1.5 h-4 w-4" />
            View delivery logs
          </Link>
        </Button>
      </div>

      <form
        onSubmit={onCreate}
        className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1 space-y-1.5">
          <label htmlFor="webhook-url" className="font-roboto text-xs font-medium text-muted-foreground">
            Webhook URL (HTTPS)
          </label>
          <Input
            id="webhook-url"
            type="url"
            required
            placeholder="https://hooks.example.com/elfa-orders"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="w-full space-y-1.5 sm:w-48">
          <label htmlFor="webhook-label" className="font-roboto text-xs font-medium text-muted-foreground">
            Label (optional)
          </label>
          <Input
            id="webhook-label"
            placeholder="CRM / Slack / …"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="bg-background"
          />
        </div>
        <Button type="submit" disabled={pending} className="shrink-0">
          <Plus className="mr-1.5 h-4 w-4" />
          Add webhook
        </Button>
      </form>

      {error ? (
        <p className="font-roboto text-sm text-destructive">{error}</p>
      ) : null}

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Endpoint</TableHead>
              <TableHead className="px-5">Event</TableHead>
              <TableHead className="px-5">Status</TableHead>
              <TableHead className="px-5">Last delivery</TableHead>
              <TableHead className="px-5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-12 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Webhook className="h-8 w-8 opacity-40" />
                    <p>
                      {pending
                        ? "Loading webhooks…"
                        : "No webhooks yet. Add an HTTPS URL above."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[320px] px-5">
                    <div className="flex flex-col gap-0.5">
                      {row.label ? (
                        <span className="font-medium">{row.label}</span>
                      ) : null}
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {row.url}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 font-mono text-xs">
                    order.created
                  </TableCell>
                  <TableCell className="px-5">
                    <span
                      className={
                        row.enabled
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }
                    >
                      {row.enabled ? "Enabled" : "Disabled"}
                    </span>
                    {row.lastStatus === "error" && row.lastError ? (
                      <p className="mt-1 text-xs text-destructive">
                        {row.lastError}
                      </p>
                    ) : null}
                    {row.lastStatus === "ok" ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Last OK
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="px-5 text-muted-foreground">
                    {formatWhen(row.lastDeliveredAt)}
                  </TableCell>
                  <TableCell className="px-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={pending}
                        onClick={() => onToggle(row)}
                      >
                        {row.enabled ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={pending}
                        onClick={() => onDelete(row.id)}
                        aria-label="Delete webhook"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
