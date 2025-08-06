export type IUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
};

export type IUserQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
