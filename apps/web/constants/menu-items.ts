import {
  Bell,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  SquareLibrary,
  Users,
} from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Classes",
    url: "/my_classes",
    icon: SquareLibrary,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
];

export const adminMenuItems = menuItems.splice(4, 0, {
  title: "Members",
  url: "/members",
  icon: Users,
});

export const connectMenuItems = menuItems;
