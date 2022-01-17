export type Nullable<T> = T | null;

export type User = {
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
  locale?: string;
} & UserCredentials;

export type UserCredentials = {
  email: string;
  password: string;
};

export type Book = {
  id: number;
  author: string;
  title: string;
  imageUrl: string;
  editor: string;
  year: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
};

export type BookList = {
  page: Book[];
  count: number;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  nextPage?: number;
};
