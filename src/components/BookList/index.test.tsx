/* eslint-disable max-nested-callbacks */
import React from 'react';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BOOK_LIST } from 'constants/mock-books';

import BookList from '.';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/books`, (req, res, ctx) => res(ctx.json({ ...BOOK_LIST })))
);

describe('BookList component', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BookList />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('when book list has been loaded', () => {
    it('should the books rendered', () => {
      // TODO: test to check if the card list has been rendered (check cards number)
    });
  });
});
