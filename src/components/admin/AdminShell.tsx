"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Ticket,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logoutAdmin } from "@/actions/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
];

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 font-roboto text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <>
      <div className="mb-8 px-3">
        <Link href="/admin" onClick={onNavigate} className="inline-flex">
          <Image
            src="/assets/images/logo-full.png"
            alt="ELFA Electric"
            width={220}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <p className="mt-2 font-roboto text-xs text-muted-foreground">
          Orders & promotions
        </p>
      </div>

      <NavLinks onNavigate={onNavigate} className="flex-1" />

      <div className="mt-auto border-t border-border pt-4">
        <Button
          type="button"
          variant="ghost"
          disabled={pending}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={() => startTransition(() => logoutAdmin())}
        >
          <LogOut className="h-4 w-4" />
          {pending ? "Signing out…" : "Sign out"}
        </Button>
      </div>
    </>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-theme dark flex min-h-screen w-full bg-background text-foreground">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-sidebar p-4 lg:flex">
        <SidebarBody />
      </aside>

      <div className="flex min-h-screen w-full flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="shrink-0" />
              }
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="admin-theme dark w-72 border-border bg-sidebar p-4"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Admin navigation</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <SidebarBody onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Image
            src="/assets/images/logo-full.png"
            alt="ELFA Electric"
            width={220}
            height={40}
            className="h-6 w-auto object-contain"
            priority
          />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
