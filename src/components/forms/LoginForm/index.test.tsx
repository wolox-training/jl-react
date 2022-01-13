import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from '.';

import { WRONG_USER, VALID_USER } from 'constants/mock-users';

const MAX_REQUIRED_MESSAGES = 2;

const onValid = jest.fn();

describe('LoginForm component', () => {
  beforeEach(() => {
    render(<LoginForm onValid={onValid} />);
  });

  describe('when inputs have not been filled ', () => {
    it('should display the maximum number of required validation messages', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

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
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText(/Login:email/), WRONG_USER.email);
      userEvent.click(submitButton);

      // THEN
      const validationError = await screen.findByText(/FormValidations:email/);
      expect(validationError).toBeTruthy();
    });

    it('password field should display an error', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText('Login:password'), WRONG_USER.password);
      userEvent.click(submitButton);

      // THEN
      const validationError = await screen.findByText(/FormValidations:password/);
      expect(validationError).toBeTruthy();
    });

    it('should onValid have not been called', async () => {
      // GIVEN
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

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
      const submitButton = screen.getByRole('button', { name: /Login:loginButton/ });

      // WHEN
      userEvent.type(screen.getByLabelText('Login:email'), VALID_USER.email);
      userEvent.type(screen.getByLabelText('Login:password'), VALID_USER.password);
      userEvent.click(submitButton);

      // THEN
      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(onValid).toHaveBeenCalled());
    });
  });
});
