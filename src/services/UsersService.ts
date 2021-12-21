import api from '../config/api';
import { User } from '../utils/types';

export const signUp = (userPayload: User) => api.post('/users', userPayload);
