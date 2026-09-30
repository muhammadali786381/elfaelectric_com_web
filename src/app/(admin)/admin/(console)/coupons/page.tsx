"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, Search, Tag } from "lucide-react";
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
import { CouponStatusBadge } from "@/components/admin/StatusBadge";
import AdminPagination from "@/components/admin/AdminPagination";
import CouponFormDialog, {
  type CouponFormValues,
} from "@/components/admin/CouponFormDialog";
import type { Coupon } from "@/components/admin/mock-data";
import {
  createCoupon,
  listCoupons,
  updateCoupon,
  type CouponView,
} from "@/actions/admin/coupons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 20;

function toCoupon(view: CouponView): Coupon {
  return {
    id: view.id,
    code: view.code,
    type: view.type,
    amount: view.amount,
    value: view.value,
    uses: view.uses,
    maxUses: view.maxUses,
    status: view.status,
  };
}

/** "-1" → unlimited (null in DB); positive → cap */
function parseMaxUses(raw: string): number | null {
  const n = Number(raw.trim());
  if (n === -1) return null;
  if (Number.isFinite(n) && n >= 1) return Math.floor(n);
  throw new Error("Invalid max uses");
}

export default function CouponsPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);
  const [page, setPage] = useState(1);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function load(nextPage = page, nextQuery = debouncedQuery) {
    startTransition(async () => {
      const result = await listCoupons({
        query: nextQuery,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });
      if (result.ok) {
        setCoupons(result.data.items.map(toCoupon));
        setTotal(result.data.total);
      }
    });
  }

  useEffect(() => {
    load(page, debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, page]);

  function onQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function openCreate() {
    setMode("create");
    setEditing(null);
    setError(null);
    setDialogOpen(true);
  }

  function openEdit(coupon: Coupon) {
    setMode("edit");
    setEditing(coupon);
    setError(null);
    setDialogOpen(true);
  }

  function handleSubmit(values: CouponFormValues) {
    setError(null);
    startTransition(async () => {
      const payload = {
        code: values.code,
        type: values.type,
        amount: values.amount,
        maxUses: parseMaxUses(values.maxUses),
        status: values.status,
      };

      const result =
        mode === "edit" && editing
          ? await updateCoupon(editing.id, payload)
          : await createCoupon(payload);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setDialogOpen(false);
      load(page);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold tracking-tight">
            Coupons
          </h1>
          <p className="mt-2 font-roboto text-sm text-muted-foreground">
            Promo codes for cart and checkout discounts.
          </p>
        </div>

        <Button type="button" className="gap-2" disabled={pending} onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Create coupon
        </Button>
      </div>

      {error ? (
        <p className="font-roboto text-sm text-destructive">{error}</p>
      ) : null}

      <CouponFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={mode}
        coupon={editing}
        pending={pending && dialogOpen}
        onSubmit={handleSubmit}
      />

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by code, type, or status…"
              className="bg-background pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Code</TableHead>
              <TableHead className="px-5">Type</TableHead>
              <TableHead className="px-5">Value</TableHead>
              <TableHead className="px-5">Usage</TableHead>
              <TableHead className="px-5">Status</TableHead>
              <TableHead className="px-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  {pending ? "Loading…" : "No coupons found."}
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="px-5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono font-medium">{coupon.code}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 text-muted-foreground">
                    {coupon.type}
                  </TableCell>
                  <TableCell className="px-5 font-medium">{coupon.value}</TableCell>
                  <TableCell className="px-5 text-muted-foreground">
                    {coupon.uses} / {coupon.maxUses}
                  </TableCell>
                  <TableCell className="px-5">
                    <CouponStatusBadge status={coupon.status} />
                  </TableCell>
                  <TableCell className="px-5 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={pending}
                      className="text-muted-foreground"
                      onClick={() => openEdit(coupon)}
                    >
                      Edit
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
