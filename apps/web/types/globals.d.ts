import { UserRole } from "@axon/types";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
}

declare global {
  interface SignUpUnsafeMetadata {
    token?: string | null;
  }
}

declare global {
  interface UserUnsafeMetadata {
    token?: string;
  }
}
