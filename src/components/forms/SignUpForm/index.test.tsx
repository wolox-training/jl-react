import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpForm from '.';

import { WRONG_USER, VALID_USER } from 'constants/mock-users';

const MAX_REQUIRED_MESSAGES = 5;

const onValid = jest.fn();

describe('SignUpForm component', () => {
  beforeEach(() => {
    render(<SignUpForm onValid={onValid} />);
  });

  describe('when inputs have not been filled ', () => {
    it('should display the maximum number of required validation messages', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.click(submitButton);

      const validationMessages = await screen.findAllByText(/FormValidations:required/);
      expect(validationMessages.length).toBe(MAX_REQUIRED_MESSAGES);
    });
  });

  describe('when inputs are wrong', () => {
    it('email field should display an error', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.type(screen.getByLabelText(/SignUp:email/), WRONG_USER.email);
      userEvent.click(submitButton);

      const validationError = await screen.findByText(/FormValidations:email/);
      expect(validationError).toBeTruthy();
    });

    it('password field should display an error', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.type(screen.getByLabelText('SignUp:password'), WRONG_USER.password);
      userEvent.click(submitButton);

      const validationError = await screen.findByText(/FormValidations:password/);
      expect(validationError).toBeTruthy();
    });

    it('passwordConfirmation field should display an error', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.type(screen.getByLabelText('SignUp:password'), VALID_USER.password);
      userEvent.type(screen.getByLabelText('SignUp:passwordConfirmation'), WRONG_USER.passwordConfirmation);
      userEvent.click(submitButton);

      const validationError = await screen.findByText(/FormValidations:passwordConfirmation/);
      expect(validationError).toBeTruthy();
    });

    it('should onValid have not been called', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.click(submitButton);

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(onValid).not.toHaveBeenCalled());
    });
  });
  describe('when inputs are valid', () => {
    it('should onValid have been called', async () => {
      const submitButton = screen.getByRole('button', { name: /SignUp:signUpButton/ });

      userEvent.type(screen.getByLabelText('SignUp:firstName'), VALID_USER.firstName);
      userEvent.type(screen.getByLabelText('SignUp:lastName'), VALID_USER.lastName);
      userEvent.type(screen.getByLabelText('SignUp:email'), VALID_USER.email);
      userEvent.type(screen.getByLabelText('SignUp:password'), VALID_USER.password);
      userEvent.type(screen.getByLabelText('SignUp:passwordConfirmation'), VALID_USER.passwordConfirmation);
      userEvent.click(submitButton);

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(onValid).toHaveBeenCalled());
    });
  });
});
