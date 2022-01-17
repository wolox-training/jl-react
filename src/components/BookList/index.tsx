import React from 'react';
import { useQuery } from 'react-query';
import i18next from 'i18next';

import { listBooks } from 'services/BooksService';
import Loading from 'components/Spinner/components/loading';

import styles from './styles.module.scss';

function BookList() {
  const { isLoading, data } = useQuery('listBooks', listBooks);

  return (
    <div className="container py-5 px-3">
      <div className="wrapper">
        <div className={`row center middle wrap ${styles.bookList}`}>
          {data?.data?.page &&
            data.data?.page.map(book => (
              <div className={`column m-1 p-2 ${styles.book}`} key={book.id}>
                <div className={styles.bookCover}>
                  <img
                    className={styles.bookCoverImage}
                    src={book.imageUrl}
                    alt={`${i18next.t('Home:bookCoverAlt')}`}
                  />
                </div>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <h3 className={styles.bookAuthor}>{book.author}</h3>
              </div>
            ))}
        </div>
      </div>
      {isLoading && (
        <div className="row center full-width">
          <Loading name="circle" />
        </div>
      )}
    </div>
  );
}

export default BookList;
