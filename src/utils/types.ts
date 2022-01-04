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
