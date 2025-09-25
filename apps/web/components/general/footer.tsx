"use client";

import NavLink from "@/components/general/nav-link";
import { ArrowBigUp, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <section className="py-12 bg-muted-foreground text-muted">
      <div className="container py-12 lg:py-24 flex items-center justify-center flex-col sm:flex-row gap-15 max-w-2xl">
        <div className="flex-1">
          <Link href="/" className="text-4xl font-extrabold">
            AxonQ
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="flex flex-col gap-2 lg:gap-4">
              <li>
                <NavLink href="/#features" className="text-muted">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink href="/#pricing" className="text-muted">
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/"
                  className="inline-flex p-1.5 mt-5 rounded-full group border-2 border-muted hover:border-primary"
                >
                  {pathname === "/" ? (
                    <ArrowBigUp
                      size={24}
                      className="text-background group-hover:text-primary"
                    />
                  ) : (
                    <Home
                      size={24}
                      className="text-background group-hover:text-primary"
                    />
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
