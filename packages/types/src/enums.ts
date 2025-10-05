export const UserRoles = ["ADMIN", "CONNECT"] as const;
export type UserRole = (typeof UserRoles)[number];
