"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, User, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import FlipButton from "@/components/ui/FlipButton";
import GlassSurface from "@/components/ui/GlassSurface";

const navLinks = [
  {
    label: "Products",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "EV-125 BIKE", href: "/ev-125", icon: "/bike1.png", mobileIcon: "/bikeblack.png" },
      { label: "EV-1 Scooty", href: "/scooty-ev-1", icon: "/scooty1.png", mobileIcon: "/scootyblack.png" },
    ],
  },
  { label: "Locations", href: "/our-locations" },
  { label: "Financing", href: "/financing-partners" },
  { label: "About", href: "/about-us" },
  { label: "PAVE", href: "/pave-scheme" },
  { label: "Education", href: "/ev-education" },
  { label: "News", href: "/newsroom" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];
const SEARCH_INDEX = [
  {
    id: "ev125",
    title: "ELFA EV-125 BIKE",
    description: "Designed to perform on rough roads",
    href: "/ev-125",
    image: "/assets/images/shop/ev-125-catalog.png",
    keywords: ["bike", "motorcycle", "ev125", "ev-125", "125"],
  },
  {
    id: "scooty",
    title: "ELFA EV-1 Scooty",
    description: "The perfect urban commuter",
    href: "/scooty-ev-1",
    image: "/assets/images/shop/ev1-scooty-catalog.png",
    keywords: ["scooty", "scooter", "ev1", "ev-1", "urban"],
  },
  {
    id: "locations",
    title: "Our Locations",
    description: "Find an ELFA dealership near you",
    href: "/our-locations",
    image: null,
    keywords: ["dealers", "dealership", "location", "buy", "store"],
  },
  {
    id: "financing",
    title: "Financing Partners",
    description: "Easy installment plans for your EV",
    href: "/financing-partners",
    image: null,
    keywords: ["finance", "installment", "loan", "bank", "pay"],
  },
  {
    id: "pave",
    title: "PAVE Scheme",
    description: "Prime Minister's scheme for electric vehicles",
    href: "/pave-scheme",
    image: null,
    keywords: ["pave", "scheme", "prime minister", "government", "subsidy"],
  },
  {
    id: "mechanics",
    title: "Certified Mechanics",
    description: "Find authorized mechanics for your ELFA EV",
    href: "/certified-mechanics",
    image: null,
    keywords: ["mechanic", "repair", "service", "maintenance", "workshop", "certified"],
  },
  {
    id: "referral",
    title: "Referral Program",
    description: "Earn PKR 10,000 for every successful referral",
    href: "/referral",
    image: null,
    keywords: ["referral", "earn", "reward", "money", "friend", "program"],
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with ELFA Electric",
    href: "/contact-us",
    image: null,
    keywords: ["contact", "support", "help", "phone", "email"],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();

  const [maxVisible, setMaxVisible] = useState(5);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1440) {
        setMaxVisible(navLinks.length);
      } else if (w >= 1280) {
        setMaxVisible(5);
      } else if (w >= 1150) {
        setMaxVisible(3);
      } else if (w >= 1024) {
        setMaxVisible(1);
      } else {
        setMaxVisible(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  const desktopNavLinks = navLinks.filter(l => l.label !== "Contact");
  const currentMax = isScrolled ? Math.min(3, maxVisible) : maxVisible;
  const visibleLinks = desktopNavLinks.slice(0, currentMax);
  const moreLinks = desktopNavLinks.slice(currentMax);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] flex w-full justify-center pointer-events-none px-3 sm:px-6">
      <div
        style={{ maxWidth: isScrolled ? "1150px" : undefined }}
        className={`relative flex items-center justify-between pointer-events-auto rounded-full transition-all duration-300 ease-out ${isScrolled
          ? "w-full h-16 sm:h-[68px] lg:h-[80px] mt-3 sm:mt-4 border border-transparent px-4 sm:px-6 lg:px-6"
          : "w-full max-w-[1000px] lg:max-w-[1600px] h-14 sm:h-16 lg:h-[96px] mt-3 sm:mt-4 lg:mt-0 lg:rounded-none border border-transparent bg-transparent shadow-none px-4 sm:px-6 lg:px-8"
          }`}
      >
        <div 
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ease-out ${
            isScrolled ? "opacity-100" : "opacity-100 lg:opacity-0"
          }`}
        >
          <GlassSurface
            width="100%"
            height="100%"
            borderRadius={40}
            borderWidth={0.07}
            blur={10}
            displace={0.38}
            distortionScale={210}
            redOffset={0}
            greenOffset={0}
            blueOffset={0}
            brightness={50}
            opacity={1}
            backgroundOpacity={0}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex w-full items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMobile}>
            <Image
              src="/assets/images/logo-full.png"
              alt="ELFA Electric"
              width={220}
              height={40}
              className="h-[26px] w-auto object-contain sm:h-[32px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex lg:gap-2">
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
                      className="font-roboto flex items-center gap-[2px] whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-300 bg-[#1a1a1a] hover:bg-[#CC5500] hover:text-white hover:border-[#CC5500] lg:px-4 lg:text-[13px]"
                      style={{
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
                      className="font-roboto flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-300 bg-[#1a1a1a] hover:bg-[#CC5500] hover:text-white hover:border-[#CC5500] lg:px-4 lg:text-[13px]"
                      style={{
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
                              className="font-roboto flex items-center gap-3 rounded-[8px] px-4 py-2.5 text-[13px] font-medium tracking-wide text-text-secondary transition-all hover:bg-white/5 hover:text-brand-primary group"
                            >
                              {item.icon && (
                                <div className="relative flex h-5 w-7 shrink-0 items-center justify-center transition-transform group-hover:scale-110">
                                  <Image src={item.icon} alt={item.label} fill className="object-contain opacity-80 transition-opacity group-hover:opacity-100" sizes="28px" />
                                </div>
                              )}
                              <span className="mt-0.5">{item.label}</span>
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
                    className="font-roboto flex items-center gap-[2px] whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-300 bg-[#1a1a1a] hover:bg-[#CC5500] hover:text-white hover:border-[#CC5500] lg:px-4 lg:text-[13px]"
                    style={{
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

            <Link
              href="/contact-us"
              className="font-roboto flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.3px] text-white transition-all duration-300 bg-[#1a1a1a] hover:bg-[#CC5500] hover:text-white hover:border-[#CC5500] lg:px-4 lg:text-[13px]"
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Right side Actions */}
          <div className="flex shrink-0 items-center gap-2 pl-4 lg:gap-3 lg:pl-6">
            <FlipButton
              href="https://webapp.elfaelectric.com/login"
              variant="dark"
              icon={<User className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
              className="font-roboto hidden h-9 whitespace-nowrap !bg-[#1a1a1a] px-4 text-[11px] font-semibold tracking-[1px] lg:inline-flex 2xl:h-10 2xl:text-[12px] border border-white/5"
            >
              Login
            </FlipButton>

            <FlipButton
              href="/book-a-test-ride"
              variant="primary"
              icon={<Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />}
              className="font-roboto hidden h-9 whitespace-nowrap px-4 text-[11px] tracking-[1px] lg:inline-flex 2xl:h-10 2xl:text-[12px]"
            >
              Book a test ride
            </FlipButton>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/5 text-text-primary transition-all hover:bg-white/10 2xl:h-10 2xl:w-10"
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
      </div>

      {/* Tablet / mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[10000] flex flex-col overflow-y-auto bg-[#00E573] p-6 lg:hidden pointer-events-auto"
          >
            {/* Top bar inside menu */}
            <div className="flex items-center justify-between pb-8 pt-4">
              <Link href="/" onClick={closeMobile} className="shrink-0">
                <Image
                  src="/assets/images/logo-full.png"
                  alt="ELFA Electric"
                  width={180}
                  height={32}
                  className="h-[28px] w-auto object-contain brightness-0"
                />
              </Link>
              <button
                onClick={closeMobile}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-black/20"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                  className="border-b border-black/10 py-4"
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsMobileProductsOpen((v) => !v)}
                        className="font-montserrat flex w-full items-center justify-between text-[26px] font-bold tracking-tight text-black"
                        aria-expanded={isMobileProductsOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-7 w-7 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                          strokeWidth={2.5}
                        />
                      </button>
                      <AnimatePresence>
                        {isMobileProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 flex flex-col gap-4 pl-4 overflow-hidden"
                          >
                            {link.dropdown?.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={closeMobile}
                                className="font-roboto flex items-center gap-4 text-[18px] font-medium text-black/70 hover:text-black transition-colors"
                              >
                                {item.icon && (
                                  <div className="relative h-6 w-8 shrink-0">
                                    <Image src={item.mobileIcon || item.icon} alt={item.label} fill className="object-contain opacity-80" sizes="32px" />
                                  </div>
                                )}
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="font-montserrat block w-full text-[26px] font-bold tracking-tight text-black"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 pb-8"
            >
              <Link
                href="/book-a-test-ride"
                onClick={closeMobile}
                className="font-montserrat flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-[14px] font-bold tracking-[1px] uppercase text-white transition-transform hover:scale-[0.98] active:scale-95 shadow-xl"
              >
                <Calendar className="h-5 w-5" />
                Book a test ride
              </Link>
              <Link
                href="https://webapp.elfaelectric.com/login"
                onClick={closeMobile}
                className="font-montserrat flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-black px-6 text-[14px] font-bold tracking-[1px] uppercase text-black transition-colors hover:bg-black hover:text-white active:scale-95"
              >
                <User className="h-5 w-5" />
                Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-start pointer-events-auto bg-black/80 p-4 pt-[10vh] backdrop-blur-sm sm:p-6 sm:pt-[15vh]"
          >
            <div className="relative w-full max-w-[700px]">
              <div className="relative flex items-center">
                <Search className="absolute left-6 h-6 w-6 text-white/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search bikes, scooties, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-roboto h-16 w-full rounded-full border border-white/10 bg-white/5 pl-16 pr-14 text-[18px] text-white shadow-2xl outline-none backdrop-blur-xl transition-all focus:border-brand-primary focus:bg-white/10"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div className="mt-8">
                {(() => {
                  const query = searchQuery.trim().toLowerCase();
                  const results = query
                    ? SEARCH_INDEX.filter(
                      (item) =>
                        item.title.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query) ||
                        item.keywords.some((kw) => kw.toLowerCase().includes(query))
                    )
                    : SEARCH_INDEX.slice(0, 2);

                  return (
                    <>
                      <p className="font-roboto mb-4 text-[14px] font-medium text-white/50 uppercase tracking-widest">
                        {query ? (results.length > 0 ? "Search Results" : "No results found") : "Popular Searches"}
                      </p>
                      <div className="flex flex-col gap-2">
                        {results.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsSearchOpen(false)}
                            className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.05]"
                          >
                            <div className="flex items-center gap-4">
                              {item.image ? (
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">
                                  <Image src={item.image} alt={item.title} fill sizes="48px" className="object-contain p-1" />
                                </div>
                              ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors group-hover:text-brand-primary">
                                  <Search className="h-5 w-5" />
                                </div>
                              )}
                              <div>
                                <p className="font-montserrat text-[16px] font-bold text-white transition-colors group-hover:text-brand-primary">
                                  {item.title}
                                </p>
                                <p className="font-roboto text-[13px] text-white/50">{item.description}</p>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/30 transition-colors group-hover:text-brand-primary" />
                          </Link>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
