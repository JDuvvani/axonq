import AuthProvider from "@/components/providers/authProvider";
import SocketProvider from "@/components/providers/socketProvider";
import { env } from "@/env/client";
import { apiFetch } from "@/lib/apiClient";
import { IUser } from "@axon/types";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await clerkAuth();
  let user: IUser | null = null;

  if (isAuthenticated) {
    const res = await apiFetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      method: "get",
    });
    const result = res.data;
    user = result.data;
  }

  return (
    <SocketProvider>
      <AuthProvider auth={user}>{children}</AuthProvider>
    </SocketProvider>
  );
}
