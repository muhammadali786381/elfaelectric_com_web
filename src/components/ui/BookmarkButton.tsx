"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: "default" | "sm";
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function BookmarkButton({
  href,
  children,
  icon,
  className,
  size = "default",
  onClick,
  target,
  rel,
}: BookmarkButtonProps) {
  const isSm = size === "sm";

  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cn(
        "bookmarkBtn group",
        isSm ? "bookmarkBtn--sm" : "bookmarkBtn--default",
        className
      )}
    >
      <span className="IconContainer">
        {icon}
      </span>
      <span className="text">
        {children}
      </span>
    </Link>
  );
}
