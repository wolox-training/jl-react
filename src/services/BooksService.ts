import api from 'config/api';
import { BookListResponse } from 'utils/types';

export const listBooks = () => api.get<BookListResponse>('/books');
