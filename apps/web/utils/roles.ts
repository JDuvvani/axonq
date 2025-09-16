import { UserRole } from "@axon/types";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: UserRole) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
