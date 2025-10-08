"use client";

import { useAuth } from "@/components/providers/authProvider";

export default function Page() {
  const user = useAuth();

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <h2 className="">{user && user.name}</h2>
    </div>
  );
}
