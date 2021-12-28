import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { User } from 'utils/types';

import SignUpForm from '.';

const MAX_REQUIRED_MESSAGES = 5;
const WRONG_USER: User = {
  firstName: '',
  lastName: '',
  email: 'wrong@%email.co',
  password: 'A1',
  passwordConfirmation: 'A1_'
};
const VALID_USER: User = {
  firstName: 'Julián',
  lastName: 'Lopera',
  email: 'test@wolox.co',
  password: 'A1234567',
  passwordConfirmation: 'A1234567'
};
// eslint-disable-next-line no-console
const onValid = jest.fn((user: User) => console.log(user));

describe('SignUpForm component', () => {
  beforeEach(() => {
    render(<SignUpForm onValid={onValid} />);
  });

  describe('when inputs have not been filled ', () => {
    it('should display the maximum number of required validation messages', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.click(submitButton);

      // THEN
      const validationMessages = await screen.findAllByText(/FormValidations:required/);
      expect(validationMessages.length).toBe(MAX_REQUIRED_MESSAGES);
    });
  });

  describe('when inputs are wrong', () => {
    it('email field should display an error', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText(/SignUp:email/), WRONG_USER.email);
      userEvent.click(submitButton);

      // THEN
      const validationError = await screen.findByText(/FormValidations:email/);
      expect(validationError).toBeTruthy();
    });

    it('password field should display an error', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText('SignUp:password'), WRONG_USER.password);
      userEvent.click(submitButton);

      // THEN
      const validationError = await screen.findByText(/FormValidations:password/);
      expect(validationError).toBeTruthy();
    });

    it('passwordConfirmation field should display an error', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText('SignUp:password'), VALID_USER.password);
      userEvent.type(screen.getByLabelText('SignUp:passwordConfirmation'), WRONG_USER.passwordConfirmation);
      userEvent.click(submitButton);

      // THEN
      const validationError = await screen.findByText(/FormValidations:passwordConfirmation/);
      expect(validationError).toBeTruthy();
    });

    it('should onValid have not been called', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.click(submitButton);

      // THEN
      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(onValid).not.toHaveBeenCalled());
    });
  });
  describe('when inputs are valid', () => {
    it('should onValid have been called', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText('SignUp:firstName'), VALID_USER.firstName);
      userEvent.type(screen.getByLabelText('SignUp:lastName'), VALID_USER.lastName);
      userEvent.type(screen.getByLabelText('SignUp:email'), VALID_USER.email);
      userEvent.type(screen.getByLabelText('SignUp:password'), VALID_USER.password);
      userEvent.type(screen.getByLabelText('SignUp:passwordConfirmation'), VALID_USER.passwordConfirmation);
      userEvent.click(submitButton);

      // THEN
      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(onValid).toHaveBeenCalled());
    });
  });
});
