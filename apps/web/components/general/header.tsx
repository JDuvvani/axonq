import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import NavLink from "@/components/general/nav-link";
import Logo from "@/components/general/logo";
import MenuButton from "./menu-button";

export default function Header() {
  return (
    <>
      <nav className="sticky top-0 bg-background/80 z-20 backdrop-blur-sm">
        <div className="container px-4 flex items-center justify-between  sm:rounded-full overflow-hidden">
          <div className="flex items-center gap-4 lg:flex-1">
            <SignedIn>
              <MenuButton />
            </SignedIn>
            <Logo />
          </div>

          <div className="flex gap-7 lg:gap-12 items-center py-3 px-4">
            <SignedOut>
              <NavLink href="/#pricing" activeStyles="text-primary">
                Pricing
              </NavLink>
            </SignedOut>
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
    </>
  );
}
