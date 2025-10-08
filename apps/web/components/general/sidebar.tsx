"use client";

import Menu from "@/components/general/menu";
import { cn } from "@/lib/utils";
import { useMenu } from "@/components/providers/menu-provider";
import SidebarModal from "@/components/general/sidebar-modal";
import { useEffect } from "react";

export default function Sidebar() {
  const menu = useMenu();
  const { menuOpen, setMenuOpen, modalOpen, setModalOpen } =
    menu!.sidebar.state;
  const { isMid } = menu!.screen;

  useEffect(() => {
    if (modalOpen && !isMid) setModalOpen(false);
    else if (menuOpen && isMid) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMid]);

  return (
    <>
      {isMid ? (
        <SidebarModal />
      ) : (
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          tabIndex={-1}
          className={cn(
            "text-sidebar-foreground relative invisible w-0 lg:visible transition-all duration-sidebar overflow-hidden",
            menuOpen ? "lg:w-sidebar" : "lg:w-sidebar-collapsed"
          )}
        >
          <Menu />

          <div
            className={cn(
              "absolute inset-y-0 left-0 bg-sidebar z-[-1] transition-all duration-sidebar",
              menuOpen ? "w-sidebar rounded-tl-none" : "w-sidebar-collapsed"
            )}
          />
        </div>
      )}
    </>
  );
}
