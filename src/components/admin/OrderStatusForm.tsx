"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "@/actions/admin/orders";
import { cn } from "@/lib/utils";

const STATUSES: OrderStatus[] = [
  "PENDING",
  "HOLD",
  "PROCESSING",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderStatusForm({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(status);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {pending ? (
          <span className="font-roboto text-xs text-muted-foreground">
            Updating…
          </span>
        ) : null}
        <select
          value={localStatus}
          disabled={pending}
          aria-busy={pending}
          onChange={(e) => {
            const next = e.target.value as OrderStatus;
            const prev = localStatus;
            setLocalStatus(next);
            setError(null);
            startTransition(async () => {
              const result = await updateOrderStatus(orderId, next);
              if (!result.ok) {
                setLocalStatus(prev);
                setError(result.error);
                return;
              }
              router.refresh();
            });
          }}
          className={cn(
            "h-9 appearance-none rounded-md border border-input bg-background px-3 font-roboto text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
            pending && "cursor-not-allowed opacity-60",
          )}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="font-roboto text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
