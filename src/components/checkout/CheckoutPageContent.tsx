"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ChevronDown, Info } from "lucide-react";
import { formatRs, useCart } from "@/components/cart/CartContext";
import {
  generateOrderId,
  PK_STATES,
  saveOrder,
  type CheckoutAddress,
  type CheckoutOrder,
} from "@/lib/orders";

const emptyAddress = (): CheckoutAddress => ({
  firstName: "",
  lastName: "",
  country: "Pakistan",
  address1: "",
  address2: "",
  city: "",
  state: "Punjab",
  postcode: "",
  phone: "",
});

const fieldClass =
  "font-roboto h-[50px] w-full rounded border border-[rgba(43,45,47,0.8)] bg-white px-3 text-[16px] text-[#212121] outline-none transition-colors placeholder:text-[#999] focus:border-[#61ce70]";

const labelClass = "font-roboto mb-1.5 block text-[13px] font-medium text-[#333]";

const sectionTitleClass =
  "font-roboto mb-4 text-[20px] font-medium leading-tight text-[#212121]";

type FieldErrors = Partial<Record<string, string>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAddress(addr: CheckoutAddress, prefix: string): FieldErrors {
  const e: FieldErrors = {};
  if (!addr.firstName.trim()) e[`${prefix}.firstName`] = "Required";
  if (!addr.lastName.trim()) e[`${prefix}.lastName`] = "Required";
  if (!addr.address1.trim()) e[`${prefix}.address1`] = "Required";
  if (!addr.city.trim()) e[`${prefix}.city`] = "Required";
  if (!addr.state.trim()) e[`${prefix}.state`] = "Required";
  if (!addr.postcode.trim()) e[`${prefix}.postcode`] = "Required";
  if (!addr.phone.trim()) e[`${prefix}.phone`] = "Required";
  return e;
}

export default function CheckoutPageContent() {
  const {
    items,
    subtotal,
    taxTotal,
    discount,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [email, setEmail] = useState("");
  const [shipping, setShipping] = useState<CheckoutAddress>(emptyAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [billing, setBilling] = useState<CheckoutAddress>(emptyAddress);
  const [showApartment, setShowApartment] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<CheckoutOrder | null>(null);

  const itemCount = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  function setShip<K extends keyof CheckoutAddress>(key: K, value: CheckoutAddress[K]) {
    setShipping((s) => ({ ...s, [key]: value }));
  }

  function setBill<K extends keyof CheckoutAddress>(key: K, value: CheckoutAddress[K]) {
    setBilling((s) => ({ ...s, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: FieldErrors = {};
    if (!email.trim() || !validateEmail(email)) next.email = "Enter a valid email";
    Object.assign(next, validateAddress(shipping, "shipping"));
    if (!billingSame) Object.assign(next, validateAddress(billing, "billing"));
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    const order: CheckoutOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "pending_payment",
      email: email.trim(),
      shipping,
      billingSameAsShipping: billingSame,
      billing: billingSame ? null : billing,
      note: addNote ? note.trim() : "",
      paymentMethod: "bacs",
      shippingMethod: "free_shipping",
      items: items.map((i) => ({ ...i })),
      subtotal,
      discount,
      couponCode: coupon?.code ?? null,
      taxTotal,
      shippingTotal: 0,
      total,
    };

    saveOrder(order);
    clearCart();
    setPlacedOrder(order);
    setSubmitting(false);
  }

  if (placedOrder) {
    return (
      <section className="bg-[#f3f3f4] py-10 lg:py-14">
        <div className="mx-auto max-w-[720px] rounded-lg border border-[#e0e0e0] bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <p className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#61ce70]">
            Order received
          </p>
          <h1 className="font-montserrat mt-2 text-[28px] font-bold text-[#212121] sm:text-[32px]">
            Thank you!
          </h1>
          <p className="font-roboto mt-3 text-[15px] leading-relaxed text-[#555]">
            Your order <span className="font-semibold text-[#212121]">{placedOrder.id}</span> is
            pending bank transfer. Please use this Order ID as the payment reference. We will
            process shipping once funds clear.
          </p>
          <div className="font-roboto mt-6 rounded-md border border-[#eee] bg-[#fafafa] px-4 py-4 text-left text-[14px] text-[#333]">
            <div className="flex justify-between gap-4 border-b border-[#eee] py-2">
              <span>Email</span>
              <span className="font-medium">{placedOrder.email}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#eee] py-2">
              <span>Total</span>
              <span className="font-bold">{formatRs(placedOrder.total)}</span>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <span>Payment</span>
              <span className="font-medium">Direct bank transfer</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="font-roboto inline-flex h-11 items-center justify-center rounded-[3px] bg-[#61ce70] px-6 text-[15px] font-bold text-white hover:bg-[#4fbf5f]"
            >
              Continue shopping
            </Link>
            <Link
              href="/"
              className="font-roboto inline-flex h-11 items-center justify-center rounded-[3px] border border-[#212121] px-6 text-[15px] text-[#212121] hover:bg-[#f5f5f5]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-[1095px] px-4 sm:px-5">
          <h1 className="font-montserrat text-[28px] font-bold text-[#212121]">Checkout</h1>
          <p className="font-roboto mt-3 text-[15px] text-[#555]">Your cart is currently empty.</p>
          <Link
            href="/shop"
            className="font-roboto mt-6 inline-flex h-10 items-center justify-center rounded-[3px] border border-[#d5d8dc] bg-[#ebe9f1] px-5 text-[14px] font-medium text-[#333] hover:bg-[#e0dde8]"
          >
            Return to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f3f3f4] py-6 lg:py-10">
      {/* Free delivery notice */}
      <div className="mx-auto mb-5 max-w-[1040px] px-4 sm:px-5">
        <div className="flex items-start gap-2 rounded-md bg-[#e8f8eb] px-4 py-3 text-[14px] leading-snug text-[#333] sm:items-center sm:text-[15px]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#61ce70] sm:mt-0" strokeWidth={2.25} />
          <p className="font-roboto">
            Free delivery in Karachi and Hyderabad! If you&apos;re in another city, our team will
            give you a call to confirm if we can deliver there and go over the options with you.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto grid w-full max-w-[1040px] grid-cols-1 gap-6 px-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_364px] lg:gap-8"
        noValidate
      >
        {/* Left: checkout fields */}
        <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 shadow-sm sm:p-7">
          {/* Contact */}
          <div className="mb-8">
            <h2 className={sectionTitleClass}>Contact information</h2>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
            {errors.email ? (
              <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">{errors.email}</p>
            ) : null}
            <p className="font-roboto mt-2 text-[13px] text-[#69727d]">
              You are currently checking out as a guest.
            </p>
          </div>

          {/* Shipping */}
          <div className="mb-8">
            <h2 className={sectionTitleClass}>Shipping address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="shipping-first_name" className={labelClass}>
                  First name
                </label>
                <input
                  id="shipping-first_name"
                  required
                  value={shipping.firstName}
                  onChange={(e) => setShip("firstName", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.firstName"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="shipping-country" className={labelClass}>
                  Country / Region
                </label>
                <select
                  id="shipping-country"
                  value={shipping.country}
                  onChange={(e) => setShip("country", e.target.value)}
                  className={fieldClass}
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="shipping-last_name" className={labelClass}>
                  Last name
                </label>
                <input
                  id="shipping-last_name"
                  required
                  value={shipping.lastName}
                  onChange={(e) => setShip("lastName", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.lastName"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="shipping-address_1" className={labelClass}>
                  Street address
                </label>
                <input
                  id="shipping-address_1"
                  required
                  value={shipping.address1}
                  onChange={(e) => setShip("address1", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.address1"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
                {!showApartment ? (
                  <button
                    type="button"
                    onClick={() => setShowApartment(true)}
                    className="font-roboto mt-2 text-[14px] text-[#61ce70] hover:underline"
                  >
                    + Add apartment, suite, unit, etc.
                  </button>
                ) : (
                  <input
                    id="shipping-address_2"
                    value={shipping.address2}
                    onChange={(e) => setShip("address2", e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                    className={`${fieldClass} mt-3`}
                  />
                )}
              </div>
              <div>
                <label htmlFor="shipping-city" className={labelClass}>
                  Town / City
                </label>
                <input
                  id="shipping-city"
                  required
                  value={shipping.city}
                  onChange={(e) => setShip("city", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.city"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="shipping-state" className={labelClass}>
                  State / County
                </label>
                <select
                  id="shipping-state"
                  value={shipping.state}
                  onChange={(e) => setShip("state", e.target.value)}
                  className={fieldClass}
                >
                  {PK_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="shipping-postcode" className={labelClass}>
                  Postcode / ZIP
                </label>
                <input
                  id="shipping-postcode"
                  required
                  value={shipping.postcode}
                  onChange={(e) => setShip("postcode", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.postcode"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="shipping-phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="shipping-phone"
                  type="tel"
                  required
                  value={shipping.phone}
                  onChange={(e) => setShip("phone", e.target.value)}
                  className={fieldClass}
                />
                {errors["shipping.phone"] ? (
                  <p className="font-roboto mt-1 text-[13px] text-[#e31e24]">Required</p>
                ) : null}
              </div>
            </div>

            <label className="font-roboto mt-4 flex cursor-pointer items-center gap-2.5 text-[14px] text-[#333]">
              <input
                type="checkbox"
                checked={billingSame}
                onChange={(e) => setBillingSame(e.target.checked)}
                className="h-4 w-4 accent-[#61ce70]"
              />
              Use same address for billing
            </label>

            {!billingSame ? (
              <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#eee] pt-6 sm:grid-cols-2">
                <p className="font-roboto sm:col-span-2 text-[16px] font-medium text-[#212121]">
                  Billing address
                </p>
                {(
                  [
                    ["firstName", "First name"],
                    ["lastName", "Last name"],
                    ["address1", "Street address"],
                    ["city", "Town / City"],
                    ["postcode", "Postcode / ZIP"],
                    ["phone", "Phone"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className={key === "address1" ? "sm:col-span-2" : ""}>
                    <label className={labelClass} htmlFor={`billing-${key}`}>
                      {label}
                    </label>
                    <input
                      id={`billing-${key}`}
                      value={billing[key]}
                      onChange={(e) => setBill(key, e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                ))}
                <div>
                  <label className={labelClass} htmlFor="billing-state">
                    State / County
                  </label>
                  <select
                    id="billing-state"
                    value={billing.state}
                    onChange={(e) => setBill("state", e.target.value)}
                    className={fieldClass}
                  >
                    {PK_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}
          </div>

          {/* Shipping options */}
          <div className="mb-8">
            <h2 className={sectionTitleClass}>Shipping options</h2>
            <label className="flex cursor-pointer items-center justify-between rounded border border-[#212121] px-4 py-3.5">
              <span className="font-roboto flex items-center gap-3 text-[14px] text-[#212121]">
                <input
                  type="radio"
                  name="shipping_method"
                  defaultChecked
                  className="h-4 w-4 accent-[#61ce70]"
                />
                Free shipping
              </span>
              <span className="font-roboto text-[13px] font-bold uppercase tracking-wide text-[#212121]">
                FREE
              </span>
            </label>
          </div>

          {/* Payment */}
          <div className="mb-8">
            <h2 className={sectionTitleClass}>Payment options</h2>
            <div className="rounded border border-[#212121]">
              <label className="flex cursor-pointer items-center gap-3 px-4 py-3.5">
                <input
                  type="radio"
                  name="payment_method"
                  defaultChecked
                  className="h-4 w-4 accent-[#61ce70]"
                />
                <span className="font-roboto text-[14px] text-[#212121]">Direct bank transfer</span>
              </label>
              <div className="border-t border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <p className="font-roboto text-[13px] leading-relaxed text-[#555]">
                  Make your payment directly into our bank account. Please use your Order ID as the
                  payment reference. Your order will not be shipped until the funds have cleared in
                  our account.
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <label className="font-roboto mb-4 flex cursor-pointer items-center gap-2.5 text-[14px] text-[#333]">
            <input
              type="checkbox"
              checked={addNote}
              onChange={(e) => setAddNote(e.target.checked)}
              className="h-4 w-4 accent-[#61ce70]"
            />
            Add a note to your order
          </label>
          {addNote ? (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="font-roboto mb-4 w-full rounded border border-[rgba(43,45,47,0.8)] bg-white px-3 py-2.5 text-[15px] text-[#212121] outline-none focus:border-[#61ce70]"
            />
          ) : null}

          <p className="font-roboto mb-5 text-[13px] leading-relaxed text-[#555]">
            By proceeding with your purchase you agree to our{" "}
            <Link href="/consent-policy" className="text-[#e31e24] hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#e31e24] hover:underline">
              Privacy Policy
            </Link>
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="font-roboto flex w-full items-center justify-center rounded-[3px] border border-[#212121] bg-transparent px-[30px] py-[18px] text-[16px] text-[#212121] transition-colors hover:bg-[#212121] hover:text-white disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
        </div>

        {/* Right: order summary */}
        <aside className="h-fit rounded-lg border border-[#e0e0e0] bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-roboto mb-4 text-[20px] font-medium text-[#212121]">Order summary</h2>

          <ul className="mb-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-[#eee] bg-[#fafafa]">
                  <Image src={item.image} alt="" fill className="object-contain p-1" sizes="64px" />
                  <span className="font-roboto absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#212121] px-1 text-[11px] font-semibold text-white">
                    {item.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-roboto text-[14px] font-medium text-[#212121]">{item.name}</p>
                  <p className="font-roboto text-[12px] text-[#69727d]">Color: {item.variantLabel}</p>
                  <p className="font-roboto mt-0.5 text-[14px] font-semibold text-[#61ce70]">
                    {formatRs(item.price * item.qty)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="font-roboto mb-3 text-[13px] text-[#69727d]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>

          {/* Coupon */}
          <button
            type="button"
            onClick={() => setCouponOpen((o) => !o)}
            className="font-roboto mb-3 flex w-full items-center justify-between border-y border-[#eee] py-3 text-left text-[14px] text-[#333]"
          >
            Add coupons
            <ChevronDown
              className={`h-4 w-4 transition-transform ${couponOpen ? "rotate-180" : ""}`}
            />
          </button>
          {couponOpen ? (
            <div className="mb-4 flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code"
                className="font-roboto h-10 flex-1 rounded border border-[#ccc] px-3 text-[14px] outline-none focus:border-[#61ce70]"
              />
              <button
                type="button"
                onClick={() => applyCoupon(couponCode)}
                className="font-roboto h-10 shrink-0 rounded bg-[#61ce70] px-4 text-[13px] font-bold text-white hover:bg-[#4fbf5f]"
              >
                Apply
              </button>
            </div>
          ) : null}
          {coupon ? (
            <button
              type="button"
              onClick={removeCoupon}
              className="font-roboto mb-3 text-[13px] text-[#e31e24] hover:underline"
            >
              Remove {coupon.code}
            </button>
          ) : null}

          <div className="font-roboto space-y-2.5 text-[14px] text-[#333]">
            <div className="flex justify-between gap-3">
              <span>Subtotal</span>
              <span>{formatRs(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between gap-3 text-[#61ce70]">
                <span>Coupon ({coupon?.code})</span>
                <span>−{formatRs(discount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between gap-3">
              <span>Free shipping</span>
              <span className="font-bold uppercase">FREE</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Taxes</span>
              <span>{formatRs(taxTotal)}</span>
            </div>
            <div className="flex justify-between gap-3 border-t border-[#212121] pt-3 text-[18px] font-bold text-[#212121]">
              <span>Total</span>
              <span>{formatRs(total)}</span>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
}
