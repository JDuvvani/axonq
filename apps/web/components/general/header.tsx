import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export default function Header() {
  return (
    <header className="flex justify-between items-center min-h-[52px] px-4">
      <div className="">
        <h1 className="text-2xl font-bold leading-none">AxonQ</h1>
      </div>
      <SignedOut>
        <div className="flex py-2">
          <Link
            href={"/sign-in"}
            className={cn("mr-4", buttonVariants({ variant: "outline" }))}
          >
            Login
          </Link>

          <Link
            href={"/sign-up"}
            className={cn("", buttonVariants({ variant: "default" }))}
          >
            Register
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex">
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
