import AuthProvider from "@/components/providers/authProvider";
import SocketProvider from "@/components/providers/socketProvider";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <AuthProvider>{children}</AuthProvider>
    </SocketProvider>
  );
}
