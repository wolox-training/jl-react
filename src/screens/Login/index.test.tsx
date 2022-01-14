import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { UserCredentials, User } from 'utils/types';
import { VALID_USER } from 'constants/mock-users';

import Login from '.';

const server = setupServer(
  rest.post<UserCredentials, User>(`${process.env.REACT_APP_API_BASE_URL}/users/sign_in`, (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === VALID_USER.email && password === VALID_USER.password) {
      return res(ctx.set('access-token', 'xRmxsCcRsIoZKzpv7x6hog'));
    }
    return res(ctx.status(401));
  })
);
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Login', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  afterAll(() => {
    server.close();
  });

  describe('when inputs are valid', () => {
    it('should redirect to /home', async () => {
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

      userEvent.type(screen.getByLabelText('Login:email'), VALID_USER.email);
      userEvent.type(screen.getByLabelText('Login:password'), VALID_USER.password);
      userEvent.click(submitButton);

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/home'));
    });
  });

  describe('when click on signUpButton', () => {
    it('should redirect to / path', async () => {
      const signUpButton = screen.getByRole('button', { name: /Login:signUpButton/ });

      userEvent.click(signUpButton);

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/sign_up'));
    });
  });
});
