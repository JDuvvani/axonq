"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useMenu } from "@/components/providers/menu-provider";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeStyles?: string;
};

export default function NavLink({
  href,
  children,
  className,
  activeStyles,
}: NavLinkProps) {
  const router = useRouter();

  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const menu = useMenu();
  const { setModalOpen } = menu!.sidebar.state;
  const { isMobile, isMid } = menu!.screen;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile || isMid) setModalOpen(false);

    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "transition-colors duration-200 text-foreground font-semibold",
        className,
        isActive && activeStyles
      )}
    >
      {children}
    </Link>
  );
}
