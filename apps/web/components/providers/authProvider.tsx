"use client";

import React, { useEffect, useState } from "react";
import { IUser } from "@axon/types";
import { createContext, useContext } from "react";

const AuthContext = createContext<IUser | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: IUser | null;
}) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!auth) return;

    setUser(auth);

    return () => {
      setUser(null);
    };
  }, [auth]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
