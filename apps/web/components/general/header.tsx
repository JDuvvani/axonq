import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import NavLink from "@/components/general/nav-link";

export default function Header() {
  return (
    <nav className="sticky top-0 bg-background/80 z-20 backdrop-blur-sm">
      <div className="container px-4 flex items-center justify-between  sm:rounded-full overflow-hidden">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex shrink-0 leading-none">
            <span className="text-2xl font-bold">AxonQ</span>
          </Link>
        </div>

        <div className="flex gap-7 lg:gap-12 items-center py-3 px-4">
          <NavLink href="/#pricing">Pricing</NavLink>
          <SignedIn>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/classes">Classes</NavLink>
            <NavLink href="/messages">Messages</NavLink>
          </SignedIn>
        </div>

        <SignedOut>
          <div className="flex items-center justify-end lg:flex-1">
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
