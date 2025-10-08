import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 py-4 pl-4 pr-2.5 text-xl font-bold",
        className
      )}
    >
      <span className="leading-none">AxonQ</span>
    </Link>
  );
}
