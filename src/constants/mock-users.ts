import { User } from 'utils/types';

export const WRONG_USER: User = {
  firstName: '',
  lastName: '',
  email: 'wrong@%email.co',
  password: 'A1',
  passwordConfirmation: 'A1_'
};

export const VALID_USER: User = {
  firstName: 'Julián',
  lastName: 'Lopera',
  email: 'test@wolox.co',
  password: 'A1234567',
  passwordConfirmation: 'A1234567'
};

export const USER_PROP_INDEXES = {
  firstName: 0,
  lastName: 1,
  email: 2,
  password: 3,
  passwordConfirmation: 4
};
