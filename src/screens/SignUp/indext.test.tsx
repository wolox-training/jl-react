import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import SignUpForm from 'components/forms/SignUpForm';
import { User } from 'utils/types';
import { VALID_USER, USER_PROP_INDEXES } from 'constants/mock-users';

import SignUp from '.';

const server = setupServer(
  rest.post<User, User>(`${process.env.REACT_APP_API_BASE_URL}/users`, (req, res, ctx) => {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;

    return res(
      ctx.json({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
      })
    );
  })
);
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('SignUp', () => {
  // eslint-disable-next-line init-declarations
  let wrapper: any;
  const queryClient = new QueryClient();

  beforeAll(() => {
    wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <SignUp />
        </MemoryRouter>
      </QueryClientProvider>
    );
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('renders one <SignUpForm /> component', () => {
    expect(wrapper.find(SignUpForm)).toHaveLength(1);
  });

  describe('when inputs are valid', () => {
    it('test', async () => {
      wrapper
        .find('.form-input')
        .at(USER_PROP_INDEXES.firstName)
        .instance().value = VALID_USER.firstName;
      wrapper
        .find('.form-input')
        .at(USER_PROP_INDEXES.lastName)
        .instance().value = VALID_USER.lastName;
      wrapper
        .find('.form-input')
        .at(USER_PROP_INDEXES.email)
        .instance().value = VALID_USER.email;
      wrapper
        .find('.form-input')
        .at(USER_PROP_INDEXES.password)
        .instance().value = VALID_USER.password;
      wrapper
        .find('.form-input')
        .at(USER_PROP_INDEXES.passwordConfirmation)
        .instance().value = VALID_USER.passwordConfirmation;

      wrapper
        .find('.form-submit')
        .hostNodes()
        .simulate('submit');

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });

  describe('when click on loginButton', () => {
    it('should redirect to / path', async () => {
      wrapper
        .find('.button-redirect')
        .hostNodes()
        .simulate('click');

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });
});
