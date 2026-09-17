import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Container from "@/components/ui/Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Blog", href: "/blog" },
  { label: "Referral", href: "/referral" },
  { label: "FAQs", href: "#faq" },
  { label: "About us", href: "/about-us" },
  { label: "Certified Mechanics", href: "/certified-mechanics" },
  { label: "Contact Us", href: "/contact-us" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/elfaelectric",
    label: "Facebook",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/elfaelectric",
    label: "Instagram",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/elfaelectric",
    label: "LinkedIn",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@elfaelectric",
    label: "TikTok",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@elfaelectric",
    label: "YouTube",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-gray-300">
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="/assets/images/logo-full.png"
              alt="ELFA Electric"
              width={220}
              height={54}
              className="mb-5 h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="font-roboto mb-6 max-w-sm text-[14px] leading-relaxed text-gray-400">
              Transforming perceptions of motorbikes and their environmental impact, for a greener
              tomorrow.
            </p>
            <div className="mb-6 flex flex-col gap-2 text-[14px]">
              <Link href="/cart" className="font-roboto text-gray-400 transition-colors hover:text-[#61ce70]">
                Cart (₨ 0)
              </Link>
              <a
                href="https://wa.me/923114863532"
                target="_blank"
                rel="noopener noreferrer"
                className="font-roboto text-gray-400 transition-colors hover:text-[#61ce70]"
              >
                WhatsApp us
              </a>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#61ce70]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat mb-5 text-[14px] font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-roboto text-[14px] text-gray-400 transition-colors hover:text-[#61ce70]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat mb-5 text-[14px] font-bold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-[14px] text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#61ce70]" />
                <span className="font-roboto">
                  C3i GA-70-A3, Korangi Creek Industrial Park Korangi, Karachi, Sindh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#61ce70]" />
                <div className="font-roboto flex flex-col gap-1">
                  <a href="tel:02137173532" className="transition-colors hover:text-[#61ce70]">
                    021-37173532
                  </a>
                  <a
                    href="https://wa.me/923114863532"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#61ce70]"
                  >
                    WhatsApp: +(92) 311-486-3532
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#61ce70]" />
                <a
                  href="mailto:info@elfaelectric.com"
                  className="font-roboto transition-colors hover:text-[#61ce70]"
                >
                  info@elfaelectric.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="font-roboto text-[13px] text-gray-500">
            Copyright © {new Date().getFullYear()} ELFA. All rights reserved.
          </p>
          <div className="font-roboto flex gap-5 text-[13px] text-gray-500">
            <Link href="/consent-policy" className="transition-colors hover:text-[#61ce70]">
              Consent &amp; Policy Acknowledgement
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-[#61ce70]">
              Privacy Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
