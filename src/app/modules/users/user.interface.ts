import { Role } from "@prisma/client";

export type IUser = {
    id: string;
    name: string;
    email: string;
    password? : string;
    role: Role;
    createdAt: Date;
}