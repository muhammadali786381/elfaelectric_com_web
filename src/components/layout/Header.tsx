"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "Products",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "EV-125 BIKE", href: "/ev-125" },
      { label: "EV-1 Scooty", href: "/scooty-ev-1" },
    ],
  },
  { label: "About us", href: "/about-us" },
  { label: "Our Dealers", href: "/our-dealers" },
  { label: "Financing Partners", href: "/financing-partners" },
  { label: "PAVE Scheme", href: "/pave-scheme" },
  { label: "Contact us", href: "/contact-us" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header className="relative z-50 h-[70px] w-full">
      {/* Fixed bar — matches live site 70px white header */}
      <div className="fixed inset-x-0 top-0 z-50 h-[70px] bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 lg:px-10 xl:px-[100px]">
          {/* Logo ~127×23 on live */}
          <Link href="/" className="relative z-50 flex shrink-0 items-center">
            <Image
              src="/assets/images/logo.png"
              alt="ELFA Electric"
              width={160}
              height={29}
              className="h-[23px] w-auto object-contain sm:h-[26px]"
              priority
            />
          </Link>

          {/* Desktop nav — Roboto 16px, ~19px gaps between items */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-[19px]">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsProductsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsProductsOpen(false)}
              >
                {link.hasDropdown ? (
                  <button
                    type="button"
                    className="font-roboto flex items-center gap-[5px] text-[16px] font-normal leading-none text-[#333] transition-colors hover:text-[#61ce70]"
                    aria-expanded={isProductsOpen}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 text-[#333]" strokeWidth={2} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="font-roboto text-[16px] font-normal leading-none text-[#333] transition-colors hover:text-[#61ce70]"
                  >
                    {link.label}
                  </Link>
                )}

                {link.hasDropdown && (
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full z-50 mt-4 min-w-[180px] border-t-2 border-[#61ce70] bg-white py-2 shadow-lg"
                      >
                        {link.dropdown?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="font-roboto block px-4 py-2.5 text-[14px] uppercase tracking-wide text-[#333] transition-colors hover:bg-gray-50 hover:text-[#61ce70]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA buttons — #212121, 14px, letter-spacing 1.2px, h-40, radius 3px */}
          <div className="flex items-center gap-5">
            <Link
              href="/book-a-test-ride"
              className="font-roboto hidden h-10 items-center gap-2 rounded-[3px] bg-[#212121] px-[13px] text-[14px] font-medium uppercase leading-none tracking-[1.2px] text-[#fcfcfc] transition-colors hover:bg-black md:inline-flex"
            >
              <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
              Book a test ride
            </Link>
            <Link
              href="/login"
              className="font-roboto hidden h-10 items-center gap-2 rounded-[3px] bg-[#212121] px-[18px] py-[13px] text-[14px] font-medium uppercase leading-none tracking-[1.2px] text-[#fcfcfc] transition-colors hover:bg-black md:inline-flex"
            >
              <User className="h-4 w-4 shrink-0" strokeWidth={2} />
              Login
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative z-50 p-2 text-[#333] lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-[70px] lg:hidden"
          >
            <div className="mt-4 flex flex-col gap-6 px-6">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                    className="font-roboto block text-lg font-medium text-[#333]"
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="mt-3 flex flex-col gap-3 border-l-2 border-[#61ce70] pl-4">
                      {link.dropdown?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="font-roboto block text-base text-gray-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <Link
                  href="/book-a-test-ride"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-roboto flex items-center justify-center gap-2 rounded-[3px] bg-[#212121] px-6 py-3 text-sm font-medium uppercase tracking-[1.2px] text-white"
                >
                  <Calendar className="h-4 w-4" />
                  Book a test ride
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-roboto flex items-center justify-center gap-2 rounded-[3px] bg-[#212121] px-6 py-3 text-sm font-medium uppercase tracking-[1.2px] text-white"
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
