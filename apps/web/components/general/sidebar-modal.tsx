"use client";

import Menu from "@/components/general/menu";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMenu } from "@/components/providers/menu-provider";
import Logo from "./logo";

export default function SidebarModal() {
  const menu = useMenu();
  const { modalOpen, setModalOpen } = menu!.sidebar.state;
  const { isMobile, isMid } = menu!.screen;

  return (
    <>
      <div
        onClick={() => setModalOpen(false)}
        className={cn(
          "absolute inset-0 bg-black/50 z-30 transition-all duration-sidebar",
          !modalOpen && "invisible opacity-0"
        )}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className={cn(
          "fixed inset-y-0 text-sidebar-foreground bg-sidebar duration-sidebar overflow-hidden z-31",
          isMobile ? "transition-[height]" : " transition-[width]",
          modalOpen
            ? isMobile
              ? "w-full h-[400px]"
              : "w-sidebar"
            : isMobile
              ? "w-fit h-0"
              : "w-0"
        )}
      >
        <div
          className={cn(
            "min-h-fit transition-all duration-sidebar",
            isMobile && !modalOpen && "w-svw",
            modalOpen
              ? isMobile
                ? "translate-y-0"
                : isMid && "translate-x-0"
              : isMobile
                ? "-translate-y-full opacity-0"
                : isMid && "-translate-x-full opacity-0"
          )}
        >
          <div className="flex items-center py-2 px-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="p-2 mr-1 h-full hover:text-secondary hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 rounded-xs cursor-pointer"
            >
              <X />
            </button>
            <Logo />
          </div>
          <Menu />
        </div>
      </div>
    </>
  );
}
