import { auth } from "@clerk/nextjs/server";
import axios, { AxiosRequestConfig } from "axios";

export const apiFetch = async (path: string, options: AxiosRequestConfig) => {
  const { getToken } = await auth();
  const token = await getToken();

  return axios(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
