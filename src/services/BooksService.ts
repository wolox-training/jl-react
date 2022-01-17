import api from 'config/api';
import { BookList } from 'utils/types';

export const listBooks = () => api.get<BookList>('/books');
