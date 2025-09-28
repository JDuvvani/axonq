"use client";

import React, { useEffect, useState } from "react";
import { IResponseShape, IUser } from "@axon/types";
import { createContext, useContext } from "react";
import { useAuth as clerkAuth } from "@clerk/nextjs";
import { apiFetchClient } from "@/lib/apiClient";

const AuthContext = createContext<IUser | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const { isSignedIn, getToken } = clerkAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const fetchMe = async () => {
      const token = await getToken();
      if (!token) return;

      const res = await apiFetchClient(
        "/users/me",
        {
          method: "get",
        },
        token
      );

      if (!res.ok) {
        throw new Error("Error getting user");
      }
      const result: IResponseShape<IUser> = await res.json();
      setUser(result.data!);
    };

    fetchMe();

    return () => {
      setUser(null);
    };
  }, [isSignedIn, getToken]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
