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

const actionLinks = [
  { label: "Book a test ride", href: "/book-a-test-ride" },
  { label: "Login", href: "/login" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <header className="relative z-50 h-[70px] w-full">
      {/* Fixed bar — matches live site 70px white header */}
      <div className="fixed inset-x-0 top-0 z-50 h-[70px] bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 xl:px-10 2xl:px-[100px]">
          <Link href="/" className="relative z-50 flex shrink-0 items-center" onClick={closeMobile}>
            <Image
              src="/assets/images/logo.png"
              alt="ELFA Electric"
              width={160}
              height={29}
              className="h-[23px] w-auto object-contain sm:h-[26px]"
              priority
            />
          </Link>

          {/* Desktop / tablet nav — roomy gaps so Contact us never crowds the CTAs */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-5 2xl:gap-6">
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
                    className="font-roboto flex items-center gap-[5px] whitespace-nowrap text-[14px] font-normal leading-none text-[#333] transition-colors hover:text-[#61ce70] xl:text-[15px] 2xl:text-[16px]"
                    aria-expanded={isProductsOpen}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#333]" strokeWidth={2} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="font-roboto whitespace-nowrap text-[14px] font-normal leading-none text-[#333] transition-colors hover:text-[#61ce70] xl:text-[15px] 2xl:text-[16px]"
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

          <div className="flex shrink-0 items-center gap-3 pl-4 xl:gap-[53px] xl:pl-8">
            {/* Header CTAs — hidden below lg; appear as text links in hamburger */}
            <Link
              href="/book-a-test-ride"
              className="font-roboto hidden h-10 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#212121] px-[13px] text-[13px] font-medium uppercase leading-none tracking-[1.2px] text-[#fcfcfc] transition-colors hover:bg-black lg:inline-flex 2xl:text-[14px]"
            >
              <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
              Book a test ride
            </Link>
            <Link
              href="/login"
              className="font-roboto hidden h-10 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#212121] px-[18px] text-[13px] font-medium uppercase leading-none tracking-[1.2px] text-[#fcfcfc] transition-colors hover:bg-black lg:inline-flex 2xl:text-[14px]"
            >
              <User className="h-4 w-4 shrink-0" strokeWidth={2} />
              Login
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative z-50 p-2 text-[#333] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet / mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-[70px] lg:hidden"
          >
            <nav className="mt-4 flex flex-col gap-1 px-6 pb-10">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-100 py-4">
                  {link.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsMobileProductsOpen((v) => !v)}
                        className="font-roboto flex w-full items-center justify-between text-lg font-medium text-[#333]"
                        aria-expanded={isMobileProductsOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                          strokeWidth={2}
                        />
                      </button>
                      {isMobileProductsOpen && (
                        <div className="mt-3 flex flex-col gap-3 border-l-2 border-[#61ce70] pl-4">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={closeMobile}
                              className="font-roboto block text-base text-gray-600"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="font-roboto block text-lg font-medium text-[#333]"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTAs as plain links in the hamburger menu */}
              {actionLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-100 py-4">
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="font-roboto block text-lg font-medium text-[#333]"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
