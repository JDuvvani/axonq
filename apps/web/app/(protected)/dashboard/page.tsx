"use client";

import { useAuth } from "@/components/providers/authProvider";

export default function Page() {
  const user = useAuth();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <h2 className="text-center">{user && user.name}</h2>
    </div>
  );
}
