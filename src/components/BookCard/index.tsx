import React from 'react';
import i18next from 'i18next';

import { Book } from 'utils/types';

import styles from './styles.module.scss';

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  return (
    <div className={`column m-1 p-2 ${styles.book}`}>
      <div className={styles.bookCover}>
        <img
          className={styles.bookCoverImage}
          src={book.imageUrl}
          alt={`${i18next.t('BookCard:coverAlt')}`}
        />
      </div>
      <h2 className={styles.bookTitle}>{book.title}</h2>
      <h3 className={styles.bookAuthor}>{book.author}</h3>
    </div>
  );
}

export default BookCard;
