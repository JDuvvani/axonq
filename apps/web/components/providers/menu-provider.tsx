"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useEffect } from "react";
import { useAuth } from "@/components/providers/authProvider";
import {
  adminMenuItems,
  connectMenuItems,
  MenuItem,
} from "@/constants/menu-items";

interface IMenuData {
  sidebar: {
    state: {
      menuOpen: boolean;
      setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
      modalOpen: boolean;
      setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };
    items: MenuItem[];
  };
  screen: { isMobile: boolean; isMid: boolean };
}

type MenuProviderProps = {
  children: React.ReactNode;
};

const MenuContext = React.createContext<IMenuData | null>(null);

export const useMenu = (): IMenuData | null => React.useContext(MenuContext);

export default function MenuProvider({ children }: MenuProviderProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [items, setItems] = React.useState<MenuItem[] | null>(null);
  const user = useAuth();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isMid = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (!user) return;
    setItems(user.role !== "ADMIN" ? adminMenuItems : connectMenuItems);
  }, [user]);

  if (!items) return null;

  const menu: IMenuData = {
    sidebar: {
      state: {
        menuOpen,
        setMenuOpen,
        modalOpen,
        setModalOpen,
      },
      items,
    },
    screen: { isMobile, isMid },
  };
  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
}
