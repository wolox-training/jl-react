import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import LoginForm from 'components/Forms/LoginForm';
import { UserCredentials, User } from 'utils/types';
import { VALID_USER } from 'constants/mock-users';

import Login from '.';

const server = setupServer(
  rest.post<UserCredentials, User>(`${process.env.REACT_APP_API_BASE_URL}/users/sign_in`, (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === VALID_USER.email && password === VALID_USER.password) {
      return res(
        ctx.set('access-token', 'xRmxsCcRsIoZKzpv7x6hog')
      );
    } else {
      return res(
        ctx.status(401)
      );
    }
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
  // eslint-disable-next-line init-declarations
  let wrapper: any;
  const queryClient = new QueryClient();

  beforeAll(() => {
    wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('renders one <LoginForm /> component', () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  describe('when inputs are valid', () => {
    it('should redirect to /home', async () => {
      wrapper
        .find('.form-input')
        .at(0)
        .instance().value = VALID_USER.email;
      wrapper
        .find('.form-input')
        .at(1)
        .instance().value = VALID_USER.password;

      wrapper
        .find('.form-submit')
        .hostNodes()
        .simulate('submit');

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/home'));
    });
  });

  describe('when click on signUpButton', () => {
    it('should redirect to / path', async () => {
      wrapper
        .find('.button-redirect')
        .hostNodes()
        .simulate('click');

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/sign_up'));
    });
  });
});
