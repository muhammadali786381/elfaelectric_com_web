import { z } from "zod";
import { PK_STATES, type CheckoutAddress } from "@/lib/orders";

const NAME_RE = /^[\p{L}\s'.-]+$/u;
const CITY_RE = /^[\p{L}\s'.-]+$/u;
const PHONE_CHARS_RE = /^[0-9+\-\s()]+$/;
const PK_POSTCODE_RE = /^\d{5}$/;

/** Digits only from a phone string. */
export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

/** Keep only phone-safe characters while typing. */
export function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d+\-\s()]/g, "").slice(0, 20);
}

/** Pakistan postcodes are 5 digits. */
export function sanitizePostcodeInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 5);
}

/**
 * Accepts common PK formats:
 * - 03XXXXXXXXX (11 digits)
 * - 3XXXXXXXXX (10 digits)
 * - +92 3XX XXXXXXX / 92XXXXXXXXXX (12 digits with country code)
 */
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .regex(PHONE_CHARS_RE, "Phone can only contain digits and + - ( )")
  .refine((value) => {
    const digits = phoneDigits(value);
    if (digits.length < 10 || digits.length > 12) return false;
    if (digits.startsWith("92") && digits.length === 12) {
      return digits[2] === "3";
    }
    if (digits.startsWith("03") && digits.length === 11) return true;
    if (digits.startsWith("3") && digits.length === 10) return true;
    // Landlines / other local numbers: 10–11 digits, must start with 0
    if (digits.startsWith("0") && (digits.length === 10 || digits.length === 11)) {
      return true;
    }
    return false;
  }, "Enter a valid Pakistan phone number");

export const checkoutAddressSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name is too long")
    .regex(NAME_RE, "First name can only contain letters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(80, "Last name is too long")
    .regex(NAME_RE, "Last name can only contain letters"),
  country: z.string().trim().min(1, "Country is required"),
  address1: z
    .string()
    .trim()
    .min(3, "Enter a street address")
    .max(200, "Address is too long"),
  address2: z.string().trim().max(200, "Address is too long"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(80, "City is too long")
    .regex(CITY_RE, "City can only contain letters"),
  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .refine((s) => (PK_STATES as readonly string[]).includes(s), "Select a valid state"),
  postcode: z
    .string()
    .trim()
    .min(1, "Postcode is required")
    .regex(PK_POSTCODE_RE, "Enter a 5-digit postcode"),
  phone: phoneSchema,
});

export const checkoutFormSchema = z
  .object({
    email: z.email({ error: "Enter a valid email" }),
    shipping: checkoutAddressSchema,
    billingSameAsShipping: z.boolean(),
    billing: checkoutAddressSchema.nullable(),
    note: z.string().max(1000, "Note is too long"),
  })
  .superRefine((data, ctx) => {
    if (!data.billingSameAsShipping && !data.billing) {
      ctx.addIssue({
        code: "custom",
        message: "Billing address is required",
        path: ["billing"],
      });
    }
  });

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;

/** Map Zod issues to dotted field keys matching the checkout form. */
export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!key || out[key]) continue;
    out[key] = issue.message;
  }
  return out;
}

export function parseCheckoutForm(input: {
  email: string;
  shipping: CheckoutAddress;
  billingSameAsShipping: boolean;
  billing: CheckoutAddress | null;
  note?: string;
}) {
  return checkoutFormSchema.safeParse({
    email: input.email.trim().toLowerCase(),
    shipping: input.shipping,
    billingSameAsShipping: input.billingSameAsShipping,
    billing: input.billingSameAsShipping ? null : input.billing,
    note: input.note ?? "",
  });
}
