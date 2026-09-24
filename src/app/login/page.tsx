import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import FlipButton from "@/components/ui/FlipButton";

export const metadata: Metadata = {
  title: "Login – ELFA Electric",
  description: "Log in to your ELFA Electric account.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero title="My Account" breadcrumb="Login" />

        <section className="bg-bg-primary py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[440px] px-4 sm:px-6">
            <form className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="username"
                  className="font-roboto mb-2 block text-[14px] font-semibold text-text-primary"
                >
                  Username or email address <span className="text-[#ff4d2e]">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-text-primary outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="font-roboto mb-2 block text-[14px] font-semibold text-text-primary"
                >
                  Password <span className="text-[#ff4d2e]">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-text-primary outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-roboto flex items-center gap-2 text-[14px] text-text-primary">
                  <input type="checkbox" name="remember" className="h-4 w-4 accent-brand-primary" />
                  Remember me
                </label>
                <Link
                  href="/contact-us"
                  className="font-roboto text-[14px] text-brand-primary transition-colors hover:text-[var(--color-brand-secondary)]"
                >
                  Lost your password?
                </Link>
              </div>

              <FlipButton
                type="submit"
                variant="primary"
                className="w-full mt-2 rounded-[6px] h-[48px] text-[15px]"
              >
                Log in
              </FlipButton>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
