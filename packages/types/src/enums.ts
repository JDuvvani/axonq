export const UserRoles = ["TEACHER", "PARENT", "ADMIN"] as const;
export type UserRole = (typeof UserRoles)[number];
