import React from 'react';
import { useQuery } from 'react-query';

import { listBooks } from 'services/BooksService';
import Loading from 'components/Spinner/components/loading';
import BookCard from 'components/BookCard';

import styles from './styles.module.scss';

function BookList() {
  const { data, status } = useQuery('listBooks', listBooks);

  if (status === 'loading') {
    return (
      <div className="row center full-width">
        <Loading name="circle" />
      </div>
    );
  }

  return (
    <div className="container py-5 px-3">
      <div className="wrapper">
        <div className={`row center middle wrap ${styles.bookList}`}>
          {data?.data?.page?.map(book => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookList;
