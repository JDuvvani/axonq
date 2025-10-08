"use client";

import { Menu } from "lucide-react";
import React from "react";
import { useMenu } from "@/components/providers/menu-provider";

export default function MenuButton() {
  const menu = useMenu();
  const { setMenuOpen, setModalOpen } = menu!.sidebar.state;
  const { isMobile, isMid } = menu!.screen;

  const toggleMenu = () =>
    isMobile || isMid
      ? setModalOpen((prev) => !prev)
      : setMenuOpen((prev) => !prev);

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="p-2 h-full hover:bg-muted cursor-pointer"
    >
      <Menu />
    </button>
  );
}
