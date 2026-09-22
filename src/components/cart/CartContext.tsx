"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  variantLabel: string;
  price: number;
  tax: number;
  image: string;
  qty: number;
};

/** Soft-deleted cart line — restore within UNDO_MS */
export type RemovedNotice = {
  noticeId: string;
  item: CartItem;
  removedAt: number;
};

type FlyPayload = {
  image: string;
  from: { x: number; y: number; w: number; h: number };
};

type AppliedCoupon = {
  code: string;
  /** Flat PKR discount off subtotal */
  discount: number;
  label: string;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  fly: FlyPayload | null;
  itemCount: number;
  subtotal: number;
  taxTotal: number;
  discount: number;
  total: number;
  coupon: AppliedCoupon | null;
  couponMessage: string | null;
  removedNotices: RemovedNotice[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }, flyFrom?: DOMRect | null) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  undoRemove: (noticeId: string) => void;
  dismissNotice: (noticeId: string) => void;
  clearCart: () => void;
  clearFly: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "elfa-cart-v1";
const COUPON_KEY = "elfa-cart-coupon-v1";
const UNDO_KEY = "elfa-cart-undo-v1";
/** WooCommerce-style undo window */
export const UNDO_MS = 5 * 60 * 1000;

/**
 * Live site coupons are WooCommerce server-side (`/?wc-ajax=apply_coupon` + nonce).
 * Cross-origin Next.js cannot apply WP coupons without Store API / proxy.
 * These local demo codes mirror typical promo UX until a WooCommerce backend is wired.
 */
const LOCAL_COUPONS: Record<string, { discount: number; label: string }> = {
  ELFA10K: { discount: 10000, label: "ELFA10K (−Rs 10,000)" },
  SAVE5K: { discount: 5000, label: "SAVE5K (−Rs 5,000)" },
};

function parseMoney(rupeesLabel: string): number {
  const n = Number(rupeesLabel.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function moneyFromPurchase(priceCurrent: string, priceTaxNote?: string) {
  const price = parseMoney(priceCurrent);
  const tax = priceTaxNote ? parseMoney(priceTaxNote) : 0;
  return { price, tax };
}

export function formatRs(n: number) {
  return `Rs ${n.toLocaleString("en-PK")}`;
}

function pruneNotices(list: RemovedNotice[], now = Date.now()) {
  return list.filter((n) => now - n.removedAt < UNDO_MS);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [fly, setFly] = useState<FlyPayload | null>(null);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [removedNotices, setRemovedNotices] = useState<RemovedNotice[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const noticeSeq = useRef(0);
  const noticesRef = useRef(removedNotices);
  noticesRef.current = removedNotices;
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
      const c = localStorage.getItem(COUPON_KEY);
      if (c) setCoupon(JSON.parse(c) as AppliedCoupon);
      const u = localStorage.getItem(UNDO_KEY);
      if (u) setRemovedNotices(pruneNotices(JSON.parse(u) as RemovedNotice[]));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
      else localStorage.removeItem(COUPON_KEY);
      const alive = pruneNotices(removedNotices);
      if (alive.length) localStorage.setItem(UNDO_KEY, JSON.stringify(alive));
      else localStorage.removeItem(UNDO_KEY);
    } catch {
      /* ignore */
    }
  }, [items, coupon, removedNotices, hydrated]);

  // Expire undo notices after 5 minutes
  useEffect(() => {
    if (removedNotices.length === 0) return;
    const tick = () => setRemovedNotices((prev) => pruneNotices(prev));
    const id = window.setInterval(tick, 15_000);
    const soonest = Math.min(...removedNotices.map((n) => n.removedAt + UNDO_MS - Date.now()));
    const timeout = window.setTimeout(tick, Math.max(0, soonest) + 50);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [removedNotices]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearFly = useCallback(() => setFly(null), []);

  const pushRemoved = useCallback((item: CartItem) => {
    noticeSeq.current += 1;
    const notice: RemovedNotice = {
      noticeId: `rm-${Date.now()}-${noticeSeq.current}`,
      item,
      removedAt: Date.now(),
    };
    setRemovedNotices((prev) => pruneNotices([...prev, notice]));
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }, flyFrom?: DOMRect | null) => {
      const qty = Math.max(1, item.qty ?? 1);
      setItems((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + qty, image: item.image } : p,
          );
        }
        return [...prev, { ...item, qty }];
      });

      if (flyFrom) {
        setFly({
          image: item.image,
          from: {
            x: flyFrom.left + flyFrom.width / 2,
            y: flyFrom.top + flyFrom.height / 2,
            w: flyFrom.width,
            h: flyFrom.height,
          },
        });
      } else {
        setIsOpen(true);
      }
    },
    [],
  );

  const updateQty = useCallback(
    (id: string, qty: number) => {
      setItems((prev) => {
        const target = prev.find((p) => p.id === id);
        if (!target) return prev;
        if (qty <= 0) {
          pushRemoved(target);
          return prev.filter((p) => p.id !== id);
        }
        return prev.map((p) => (p.id === id ? { ...p, qty } : p));
      });
    },
    [pushRemoved],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const target = prev.find((p) => p.id === id);
        if (target) pushRemoved(target);
        return prev.filter((p) => p.id !== id);
      });
    },
    [pushRemoved],
  );

  const undoRemove = useCallback((noticeId: string) => {
    const notice = noticesRef.current.find((n) => n.noticeId === noticeId);
    if (!notice || Date.now() - notice.removedAt >= UNDO_MS) {
      setRemovedNotices((prev) => pruneNotices(prev));
      return;
    }
    setItems((items) => {
      const existing = items.find((p) => p.id === notice.item.id);
      if (existing) {
        return items.map((p) =>
          p.id === notice.item.id
            ? { ...p, qty: p.qty + notice.item.qty, image: notice.item.image }
            : p,
        );
      }
      return [...items, notice.item];
    });
    setRemovedNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
  }, []);

  const dismissNotice = useCallback((noticeId: string) => {
    setRemovedNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
  }, []);

  const clearCart = useCallback(() => {
    const prev = itemsRef.current;
    if (prev.length) {
      const now = Date.now();
      setRemovedNotices((notices) =>
        pruneNotices([
          ...notices,
          ...prev.map((item, i) => ({
            noticeId: `rm-${now}-clear-${i}`,
            item,
            removedAt: now,
          })),
        ]),
      );
    }
    setItems([]);
    setCoupon(null);
    setCouponMessage(null);
  }, []);

  const applyCoupon = useCallback(
    (raw: string) => {
      const code = raw.trim().toUpperCase();
      if (!code) {
        setCouponMessage("Please enter a coupon code.");
        return false;
      }
      const match = LOCAL_COUPONS[code];
      if (!match) {
        setCouponMessage("Coupon “" + code + "” does not exist!");
        return false;
      }
      const sub = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const discount = Math.min(match.discount, sub);
      setCoupon({ code, discount, label: match.label });
      setCouponMessage("Coupon code applied successfully.");
      return true;
    },
    [items],
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setCouponMessage(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );
  const taxTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.tax * i.qty, 0),
    [items],
  );
  const discount = coupon ? Math.min(coupon.discount, subtotal) : 0;
  const total = Math.max(0, subtotal - discount) + taxTotal;
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      fly,
      itemCount,
      subtotal,
      taxTotal,
      discount,
      total,
      coupon,
      couponMessage,
      removedNotices,
      openCart,
      closeCart,
      addItem,
      updateQty,
      removeItem,
      undoRemove,
      dismissNotice,
      clearCart,
      clearFly,
      applyCoupon,
      removeCoupon,
    }),
    [
      items,
      isOpen,
      fly,
      itemCount,
      subtotal,
      taxTotal,
      discount,
      total,
      coupon,
      couponMessage,
      removedNotices,
      openCart,
      closeCart,
      addItem,
      updateQty,
      removeItem,
      undoRemove,
      dismissNotice,
      clearCart,
      clearFly,
      applyCoupon,
      removeCoupon,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
