import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

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

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[440px] px-4 sm:px-6">
            <form className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="username"
                  className="font-roboto mb-2 block text-[14px] font-semibold text-[#212121]"
                >
                  Username or email address <span className="text-[#ff4d2e]">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-[#212121] outline-none transition-colors focus:border-[#61ce70]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="font-roboto mb-2 block text-[14px] font-semibold text-[#212121]"
                >
                  Password <span className="text-[#ff4d2e]">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-[#212121] outline-none transition-colors focus:border-[#61ce70]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-roboto flex items-center gap-2 text-[14px] text-[#212121]">
                  <input type="checkbox" name="remember" className="h-4 w-4 accent-[#61ce70]" />
                  Remember me
                </label>
                <Link
                  href="/contact-us"
                  className="font-roboto text-[14px] text-[#61ce70] transition-colors hover:text-[#4fbf5f]"
                >
                  Lost your password?
                </Link>
              </div>

              <button
                type="submit"
                className="font-roboto mt-2 inline-flex h-[48px] items-center justify-center rounded-[6px] bg-[#61ce70] text-[15px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                Log in
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
