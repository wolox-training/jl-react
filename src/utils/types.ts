export type Nullable<T> = T | null;

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  locale?: string;
};
