"use client";

import NavLink from "./nav-link";
import { cn } from "@/lib/utils";
import { useMenu } from "@/components/providers/menu-provider";

export default function Menu() {
  const menu = useMenu();
  const { menuOpen } = menu!.sidebar.state;
  const { items } = menu!.sidebar;
  const { isMobile, isMid } = menu!.screen;

  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          <NavLink
            href={item.url}
            className="flex items-center group text-inherit px-5 py-4 hover:bg-white/20 transition-colors font-normal focus-visible:ring-transparent focus-visible:bg-white/20"
            activeStyles="bg-white/15"
          >
            <span className="group-hover:scale-110 group-focus-visible:scale-110">
              <item.icon />
            </span>

            <span
              className={cn(
                "text-lg leading-none text-nowrap ml-4 transition-all duration-sidebar",
                !menuOpen &&
                  !(isMobile || isMid) &&
                  "w-0 ml-0 opacity-0 invisible"
              )}
            >
              {item.title}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
