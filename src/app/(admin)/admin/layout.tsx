import type { ReactNode } from "react";

/** Passthrough — shell lives on (console); login has its own layout. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}
