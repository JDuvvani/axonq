import { CreateUserDTO, UserRole } from "@axon/types";

export type CreateUser = Omit<CreateUserDTO, "token"> & { role: UserRole };
