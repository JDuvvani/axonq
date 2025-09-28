import { env } from "@/env/client";
import { auth } from "@clerk/nextjs/server";

export const apiFetchServer = async (
  path: string,
  options: RequestInit,
  data?: object
) => {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) throw new Error("No auth token found");

  return fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
