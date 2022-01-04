import api from 'config/api';
import { User, UserCredentials } from 'utils/types';

export const signUp = (userPayload: User) => api.post('/users', userPayload);

export const login = (userCredentialsPayload: UserCredentials) =>
  api.post('/users/sign_in', userCredentialsPayload);
