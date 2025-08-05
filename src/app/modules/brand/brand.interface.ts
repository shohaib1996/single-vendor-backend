export type IBrand = {
  id: string;
  name: string;
  categoryIds?: string[];
};

export type IBrandQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
};
