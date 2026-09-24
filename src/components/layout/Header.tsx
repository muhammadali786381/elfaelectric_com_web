"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, User, Search } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "EV-125 BIKE", href: "/ev-125" },
      { label: "EV-1 Scooty", href: "/scooty-ev-1" },
    ],
  },
  { label: "Dealers", href: "/our-dealers" },
  { label: "About", href: "/about-us" },
  { label: "Financing", href: "/financing-partners" },
  { label: "PAVE", href: "/pave-scheme" },
  { label: "Education", href: "/ev-education" },
  { label: "News", href: "/newsroom" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  const visibleLinks = isScrolled ? navLinks.slice(0, 4) : navLinks;
  const moreLinks = isScrolled ? navLinks.slice(4) : [];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex w-full justify-center pointer-events-none">
      <motion.div
        layout
        initial={false}
        animate={{
          width: isScrolled ? "min(1000px, calc(100vw - 32px))" : "100%",
          maxWidth: isScrolled ? "1000px" : "1600px",
          height: isScrolled ? "64px" : "80px",
          borderRadius: isScrolled ? "999px" : "0px",
          marginTop: isScrolled ? "16px" : "0px",
          backgroundColor: isScrolled ? "rgba(18, 18, 18, 0)" : "rgba(0, 0, 0, 0)",
          borderColor: isScrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex items-center justify-between pointer-events-auto px-4 sm:px-6 lg:px-8"
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        {/* Glass pill background - only when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
              style={{
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                backgroundColor: "rgba(10, 10, 12, 0.4)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Content Layer (on top of glass so dropdowns are not clipped) */}
        <div className="relative z-10 flex w-full items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMobile}>
            <Image
              src="/assets/images/logo-full.png"
              alt="ELFA Electric"
              width={220}
              height={40}
              className="h-[30px] w-auto object-contain sm:h-[34px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            <AnimatePresence mode="popLayout">
              {visibleLinks.map((link) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setIsProductsOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsProductsOpen(false)}
                >
                  {link.hasDropdown ? (
                    <button
                      type="button"
                      className="font-roboto flex items-center gap-[2px] whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:bg-white/10 xl:px-4 xl:text-[13px]"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                      aria-expanded={isProductsOpen}
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 shrink-0" strokeWidth={2} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-roboto flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:bg-white/10 xl:px-4 xl:text-[13px]"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-1/2 top-full mt-3 min-w-[180px] -translate-x-1/2 overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a]/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                        >
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="font-roboto flex items-center rounded-[8px] px-4 py-2.5 text-[12px] font-medium tracking-wide text-text-secondary transition-all hover:bg-white/5 hover:text-brand-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}

              {moreLinks.length > 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button
                    type="button"
                    className="font-roboto flex items-center gap-[2px] whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:bg-white/10 xl:px-4 xl:text-[13px]"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                    aria-expanded={isMoreOpen}
                  >
                    More
                    <ChevronDown className="h-3 w-3 shrink-0" strokeWidth={2} />
                  </button>

                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full mt-3 min-w-[180px] -translate-x-1/2 overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a]/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                      >
                        {moreLinks.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="font-roboto flex items-center rounded-[8px] px-4 py-2.5 text-[12px] font-medium tracking-wide text-text-secondary transition-all hover:bg-white/5 hover:text-brand-primary"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right side Actions */}
          <div className="flex shrink-0 items-center gap-2 pl-4 xl:gap-3 xl:pl-6">
            <Link
              href="/login"
              className="font-roboto hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/5 px-4 text-[11px] font-semibold uppercase tracking-[1px] text-text-primary transition-all hover:bg-white/10 lg:flex 2xl:h-10 2xl:text-[12px]"
            >
              <User className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span className="hidden xl:inline">Login</span>
            </Link>

            <Link
              href="/book-a-test-ride"
              className="font-roboto hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-primary px-4 text-[11px] font-bold uppercase tracking-[1px] text-bg-primary transition-all hover:bg-brand-secondary hover:shadow-[0_0_20px_rgba(97,206,112,0.4)] lg:flex 2xl:h-10 2xl:text-[12px]"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              <span className={isScrolled ? "hidden xl:inline" : "hidden lg:inline"}>
                Book a test ride
              </span>
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-text-primary transition-all hover:bg-white/10 2xl:h-10 2xl:w-10"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 2xl:h-4 2xl:w-4" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative z-50 ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-primary transition-all hover:bg-white/10 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tablet / mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg-primary pt-[80px] lg:hidden pointer-events-auto"
          >
            <nav className="mt-4 flex flex-col gap-1 px-6 pb-[100px]">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-white/5 py-4">
                  {link.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsMobileProductsOpen((v) => !v)}
                        className="font-roboto flex w-full items-center justify-between text-[18px] font-medium text-text-primary"
                        aria-expanded={isMobileProductsOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                          strokeWidth={2}
                        />
                      </button>
                      {isMobileProductsOpen && (
                        <div className="mt-4 flex flex-col gap-3 border-l-2 border-brand-primary pl-5">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={closeMobile}
                              className="font-roboto block text-[15px] text-text-secondary hover:text-brand-primary"
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
                      className="font-roboto block text-[18px] font-medium text-text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/book-a-test-ride"
                  onClick={closeMobile}
                  className="font-roboto flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary text-[14px] font-bold uppercase tracking-[1px] text-bg-primary"
                >
                  <Calendar className="h-5 w-5 shrink-0" />
                  Book a test ride
                </Link>
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="font-roboto flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-[14px] font-bold uppercase tracking-[1px] text-text-primary"
                >
                  <User className="h-5 w-5 shrink-0" />
                  Login
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
