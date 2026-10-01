"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ChevronDown, Info } from "lucide-react";
import { formatRs, useCart } from "@/components/cart/CartContext";
import FlipButton from "@/components/ui/FlipButton";
import { placeOrder } from "@/actions/checkout";
import {
  parseCheckoutForm,
  sanitizePhoneInput,
  sanitizePostcodeInput,
  zodFieldErrors,
} from "@/lib/checkout-schema";
import { PK_STATES, type CheckoutAddress } from "@/lib/orders";

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
  "font-roboto h-[50px] w-full rounded-lg border border-white/10 bg-white/5 px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-primary";

const fieldErrorClass =
  "font-roboto border-red-500/60 focus:border-red-400";

const labelClass = "font-roboto mb-2 block text-[13px] font-bold tracking-wide text-white/70";

const sectionTitleClass =
  "font-montserrat mb-6 text-[24px] font-bold tracking-tight text-white border-b border-white/10 pb-4";

const sectionClass =
  "rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl";

type FieldErrors = Partial<Record<string, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-roboto mt-1.5 text-[13px] font-medium text-red-400">{message}</p>
  );
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{
    id: string;
    email: string;
    total: number;
  } | null>(null);

  const itemCount = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  function setShip<K extends keyof CheckoutAddress>(key: K, value: CheckoutAddress[K]) {
    setShipping((s) => ({ ...s, [key]: value }));
  }

  function setBill<K extends keyof CheckoutAddress>(key: K, value: CheckoutAddress[K]) {
    setBilling((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseCheckoutForm({
      email,
      shipping,
      billingSameAsShipping: billingSame,
      billing: billingSame ? null : billing,
      note: addNote ? note : "",
    });

    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await placeOrder({
        email: parsed.data.email,
        shipping: parsed.data.shipping,
        billingSameAsShipping: parsed.data.billingSameAsShipping,
        billing: parsed.data.billing,
        note: parsed.data.note,
        items: items.map((i) => ({ ...i })),
        couponCode: coupon?.code ?? null,
      });
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
      clearCart();
      setPlacedOrder({
        id: result.data.id,
        email: result.data.email,
        total: result.data.total,
      });
    } catch {
      setSubmitError("Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function inputClass(field: string) {
    return errors[field] ? `${fieldClass} ${fieldErrorClass}` : fieldClass;
  }

  if (placedOrder) {
    return (
      <section className="bg-[#050505] text-white pt-32 pb-10 lg:pt-40 lg:pb-24 min-h-[70vh] flex flex-col items-center justify-center">
        <div className={`${sectionClass} mx-auto max-w-[720px] text-center`}>
          <p className="font-montserrat text-[14px] font-bold uppercase tracking-widest text-brand-primary">
            Order received
          </p>
          <h1 className="font-montserrat mt-4 text-[32px] font-bold text-white sm:text-[42px]">
            Thank you!
          </h1>
          <p className="font-roboto mt-4 text-[16px] leading-relaxed text-white/70">
            Your order <span className="font-bold text-white">{placedOrder.id}</span> is
            pending bank transfer. Please use this Order ID as the payment reference. We will
            process shipping once funds clear.
          </p>
          <div className="font-roboto mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-left text-[15px] text-white/70">
            <div className="flex justify-between gap-4 border-b border-white/10 py-3">
              <span>Email</span>
              <span className="font-bold text-white">{placedOrder.email}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 py-3">
              <span>Total</span>
              <span className="font-bold text-brand-primary">{formatRs(placedOrder.total)}</span>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <span>Payment</span>
              <span className="font-bold text-white">Direct bank transfer</span>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <FlipButton
              href="/shop"
              variant="primary"
              className="font-roboto h-14 rounded-xl px-8 text-[16px] font-bold"
            >
              Continue shopping
            </FlipButton>
            <FlipButton
              href="/"
              variant="outline"
              className="font-roboto h-14 rounded-xl px-8 text-[16px] font-bold"
            >
              Back to home
            </FlipButton>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-[#050505] text-white pt-32 pb-10 lg:pt-40 lg:pb-24 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="mx-auto max-w-[1095px] px-4 sm:px-5 text-center">
          <h1 className="font-montserrat mb-6 text-[32px] font-bold text-white">Checkout</h1>
          <p className="font-roboto mb-8 text-[20px] text-white/50">Your cart is currently empty.</p>
          <FlipButton
            href="/shop"
            variant="primary"
            className="font-roboto h-14 rounded-xl px-10 text-[16px] font-bold uppercase tracking-wider"
          >
            Return to shop
          </FlipButton>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050505] text-white pt-32 pb-10 lg:pt-40 lg:pb-24">
      {/* Free delivery notice */}
      <div className="mx-auto mb-8 max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-6 py-4 text-[14px] leading-snug text-white/80 sm:items-center sm:text-[15px]">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary sm:mt-0" strokeWidth={2} />
          <p className="font-roboto">
            Free delivery in Karachi and Hyderabad! If you&apos;re in another city, our team will
            give you a call to confirm if we can deliver there and go over the options with you.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8"
        noValidate
      >
        {/* Left: checkout fields */}
        <div className={`${sectionClass} flex flex-col gap-10`}>
          {/* Contact */}
          <div>
            <h2 className={sectionTitleClass}>Contact information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={inputClass("email")}
                  aria-invalid={Boolean(errors.email)}
                />
                <FieldError message={errors.email} />
              </div>
              <p className="font-roboto text-[13px] text-white/50">
                You are currently checking out as a guest.
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 className={sectionTitleClass}>Shipping address</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="shipping-first_name" className={labelClass}>
                  First name
                </label>
                <input
                  id="shipping-first_name"
                  autoComplete="given-name"
                  required
                  value={shipping.firstName}
                  onChange={(e) => setShip("firstName", e.target.value)}
                  className={inputClass("shipping.firstName")}
                  aria-invalid={Boolean(errors["shipping.firstName"])}
                />
                <FieldError message={errors["shipping.firstName"]} />
              </div>
              <div>
                <label htmlFor="shipping-country" className={labelClass}>
                  Country / Region
                </label>
                <select
                  id="shipping-country"
                  value={shipping.country}
                  onChange={(e) => setShip("country", e.target.value)}
                  className={inputClass("shipping.country")}
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
                <FieldError message={errors["shipping.country"]} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="shipping-last_name" className={labelClass}>
                  Last name
                </label>
                <input
                  id="shipping-last_name"
                  autoComplete="family-name"
                  required
                  value={shipping.lastName}
                  onChange={(e) => setShip("lastName", e.target.value)}
                  className={inputClass("shipping.lastName")}
                  aria-invalid={Boolean(errors["shipping.lastName"])}
                />
                <FieldError message={errors["shipping.lastName"]} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="shipping-address_1" className={labelClass}>
                  Street address
                </label>
                <input
                  id="shipping-address_1"
                  autoComplete="address-line1"
                  required
                  value={shipping.address1}
                  onChange={(e) => setShip("address1", e.target.value)}
                  className={inputClass("shipping.address1")}
                  aria-invalid={Boolean(errors["shipping.address1"])}
                />
                <FieldError message={errors["shipping.address1"]} />
                {!showApartment ? (
                  <button
                    type="button"
                    onClick={() => setShowApartment(true)}
                    className="font-roboto mt-3 text-[14px] font-medium text-brand-primary transition-colors hover:text-white"
                  >
                    + Add apartment, suite, unit, etc.
                  </button>
                ) : (
                  <input
                    id="shipping-address_2"
                    autoComplete="address-line2"
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
                  autoComplete="address-level2"
                  required
                  value={shipping.city}
                  onChange={(e) => setShip("city", e.target.value)}
                  className={inputClass("shipping.city")}
                  aria-invalid={Boolean(errors["shipping.city"])}
                />
                <FieldError message={errors["shipping.city"]} />
              </div>
              <div>
                <label htmlFor="shipping-state" className={labelClass}>
                  State / County
                </label>
                <select
                  id="shipping-state"
                  autoComplete="address-level1"
                  value={shipping.state}
                  onChange={(e) => setShip("state", e.target.value)}
                  className={inputClass("shipping.state")}
                >
                  {PK_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <FieldError message={errors["shipping.state"]} />
              </div>
              <div>
                <label htmlFor="shipping-postcode" className={labelClass}>
                  Postcode / ZIP
                </label>
                <input
                  id="shipping-postcode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  required
                  value={shipping.postcode}
                  onChange={(e) => setShip("postcode", sanitizePostcodeInput(e.target.value))}
                  className={inputClass("shipping.postcode")}
                  aria-invalid={Boolean(errors["shipping.postcode"])}
                  placeholder="e.g. 75500"
                />
                <FieldError message={errors["shipping.postcode"]} />
              </div>
              <div>
                <label htmlFor="shipping-phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="shipping-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={shipping.phone}
                  onChange={(e) => setShip("phone", sanitizePhoneInput(e.target.value))}
                  className={inputClass("shipping.phone")}
                  aria-invalid={Boolean(errors["shipping.phone"])}
                  placeholder="03XX XXXXXXX"
                />
                <FieldError message={errors["shipping.phone"]} />
              </div>
            </div>

            <label className="font-roboto mt-6 flex cursor-pointer items-center gap-3 text-[14px] font-medium text-white/70">
              <input
                type="checkbox"
                checked={billingSame}
                onChange={(e) => setBillingSame(e.target.checked)}
                className="h-5 w-5 rounded border-white/20 bg-white/5 accent-brand-primary"
              />
              Use same address for billing
            </label>

            {!billingSame ? (
              <div className="mt-8 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 sm:grid-cols-2">
                <p className="font-montserrat sm:col-span-2 text-[18px] font-bold text-white">
                  Billing address
                </p>
                {(
                  [
                    ["firstName", "First name", "text"],
                    ["lastName", "Last name", "text"],
                    ["address1", "Street address", "text"],
                    ["city", "Town / City", "text"],
                    ["postcode", "Postcode / ZIP", "postcode"],
                    ["phone", "Phone", "phone"],
                  ] as const
                ).map(([key, label, kind]) => {
                  const errorKey = `billing.${key}`;
                  return (
                    <div key={key} className={key === "address1" ? "sm:col-span-2" : ""}>
                      <label className={labelClass} htmlFor={`billing-${key}`}>
                        {label}
                      </label>
                      <input
                        id={`billing-${key}`}
                        type={kind === "phone" ? "tel" : "text"}
                        inputMode={
                          kind === "phone" ? "tel" : kind === "postcode" ? "numeric" : undefined
                        }
                        maxLength={kind === "postcode" ? 5 : undefined}
                        value={billing[key]}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const next =
                            kind === "phone"
                              ? sanitizePhoneInput(raw)
                              : kind === "postcode"
                                ? sanitizePostcodeInput(raw)
                                : raw;
                          setBill(key, next);
                        }}
                        className={inputClass(errorKey)}
                        aria-invalid={Boolean(errors[errorKey])}
                        placeholder={
                          kind === "phone"
                            ? "03XX XXXXXXX"
                            : kind === "postcode"
                              ? "e.g. 75500"
                              : undefined
                        }
                      />
                      <FieldError message={errors[errorKey]} />
                    </div>
                  );
                })}
                <div>
                  <label className={labelClass} htmlFor="billing-state">
                    State / County
                  </label>
                  <select
                    id="billing-state"
                    value={billing.state}
                    onChange={(e) => setBill("state", e.target.value)}
                    className={inputClass("billing.state")}
                  >
                    {PK_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors["billing.state"]} />
                </div>
              </div>
            ) : null}
          </div>

          {/* Shipping options */}
          <div>
            <h2 className={sectionTitleClass}>Shipping options</h2>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-brand-primary">
              <span className="font-roboto flex items-center gap-3 text-[15px] text-white">
                <input
                  type="radio"
                  name="shipping_method"
                  defaultChecked
                  className="h-4 w-4 accent-brand-primary"
                />
                Free shipping
              </span>
              <span className="font-roboto text-[14px] font-bold uppercase tracking-wide text-white">
                FREE
              </span>
            </label>
          </div>

          {/* Payment */}
          <div>
            <h2 className={sectionTitleClass}>Payment options</h2>
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <label className="flex cursor-pointer items-center gap-3 px-5 py-4">
                <input
                  type="radio"
                  name="payment_method"
                  defaultChecked
                  className="h-4 w-4 accent-brand-primary"
                />
                <span className="font-roboto text-[15px] font-medium text-white">Direct bank transfer</span>
              </label>
              <div className="border-t border-white/10 bg-black/20 px-5 py-4">
                <p className="font-roboto text-[14px] leading-relaxed text-white/60">
                  Make your payment directly into our bank account. Please use your Order ID as the
                  payment reference. Your order will not be shipped until the funds have cleared in
                  our account.
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="font-roboto mb-4 flex cursor-pointer items-center gap-3 text-[14px] font-medium text-white/70">
              <input
                type="checkbox"
                checked={addNote}
                onChange={(e) => setAddNote(e.target.checked)}
                className="h-5 w-5 rounded border-white/20 bg-white/5 accent-brand-primary"
              />
              Add a note to your order
            </label>
            {addNote ? (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="font-roboto w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none focus:border-brand-primary placeholder:text-white/30"
              />
            ) : null}
          </div>

          <p className="font-roboto mt-4 text-[13px] leading-relaxed text-white/50">
            By proceeding with your purchase you agree to our{" "}
            <Link href="/consent-policy" className="text-white hover:text-brand-primary hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-white hover:text-brand-primary hover:underline">
              Privacy Policy
            </Link>
          </p>

          {submitError ? (
            <p className="font-roboto mt-4 text-[14px] text-[#ff6b5a]">
              {submitError}
            </p>
          ) : null}

          <FlipButton
            type="submit"
            disabled={submitting}
            variant="primary"
            className="font-roboto mt-4 h-14 w-full rounded-xl px-6 text-[16px] font-bold uppercase tracking-wider disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </FlipButton>
        </div>

        {/* Right: order summary */}
        <div className="relative">
          <aside className={`${sectionClass} sticky top-32`}>
            <h2 className={sectionTitleClass}>Order summary</h2>

            <ul className="mb-6 space-y-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image src={item.image} alt="" fill className="object-contain p-2" sizes="80px" />
                    <span className="font-roboto absolute -top-2 -right-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-brand-primary px-1 text-[12px] font-bold text-[#050505]">
                      {item.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <p className="font-roboto text-[16px] font-bold text-white">{item.name}</p>
                    <p className="font-roboto mt-1 text-[13px] text-white/50">Color: {item.variantLabel}</p>
                    <p className="font-roboto mt-1.5 text-[15px] font-bold text-brand-primary">
                      {formatRs(item.price * item.qty)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="font-roboto mb-6 text-[14px] text-white/50">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>

            {/* Coupon */}
            <button
              type="button"
              onClick={() => setCouponOpen((o) => !o)}
              className="font-roboto mb-5 flex w-full items-center justify-between border-y border-white/10 py-4 text-left text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              Add coupons
              <ChevronDown
                className={`h-5 w-5 transition-transform ${couponOpen ? "rotate-180" : ""}`}
              />
            </button>
            {couponOpen ? (
              <div className="mb-6 flex gap-3">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="font-roboto h-12 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-primary"
                />
                <FlipButton
                  type="button"
                  onClick={() => applyCoupon(couponCode)}
                  variant="primary"
                  className="font-roboto h-12 shrink-0 rounded-lg px-6 text-[14px] font-bold"
                >
                  Apply
                </FlipButton>
              </div>
            ) : null}
            {coupon ? (
              <button
                type="button"
                onClick={removeCoupon}
                className="font-roboto mb-6 text-[13px] font-medium text-red-400 hover:underline"
              >
                Remove {coupon.code}
              </button>
            ) : null}

            <div className="font-roboto space-y-4 text-[15px] text-white/70">
              <div className="flex justify-between gap-3">
                <span>Subtotal</span>
                <span className="text-white">{formatRs(subtotal)}</span>
              </div>
              {discount > 0 ? (
                <div className="flex justify-between gap-3 text-brand-primary">
                  <span>Coupon ({coupon?.code})</span>
                  <span>−{formatRs(discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between gap-3">
                <span>Free shipping</span>
                <span className="font-bold text-white uppercase">FREE</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Taxes</span>
                <span className="text-white">{formatRs(taxTotal)}</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-white/10 pt-5 text-[20px] font-bold text-white">
                <span>Total</span>
                <span className="text-brand-primary">{formatRs(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </section>
  );
}
