import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-green-600">Landing</h1>
      </div>
    </div>
  );
}
