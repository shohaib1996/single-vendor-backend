// Define Role enum locally if not available from @prisma/client
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  // Add other roles as needed
}

export type IUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  address?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
};
