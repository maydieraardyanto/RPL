import { UserRole } from "@prisma/client";

export type User = {
    id: number;
    username: String;
    password: String;
    role : UserRole
};