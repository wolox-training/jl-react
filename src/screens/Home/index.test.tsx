import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import logoWoloxImg from 'assets/LogoWolox.png';

import Home from '.';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Home screen', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );
  });

  describe('WoloxLogo', () => {
    it('should have a /home link', async () => {
      // GIVEN
      const link = screen.getByRole('link');
      
      // THEN
      expect(link).toBeTruthy();
      expect(link).toHaveAttribute('href', '/home')
    });

    it('should display an image', async () => {
      // GIVEN
      const img = screen.getByRole('img');
      
      // THEN
      expect(img).toBeTruthy();
      expect(img).toHaveAttribute('src', logoWoloxImg)
    });    
  });

  describe('Logout button', () => {
    it('should display a logout button ', () => {
      // GIVEN
      const logoutButton = screen.getByRole('button');
  
      // THEN
      expect(logoutButton).toBeTruthy();
    });

    it('should redirect to / path', async () => {
      // WHEN
      const logoutButton = screen.getByRole('button');

      // WHEN
      userEvent.click(logoutButton);

      // THEN
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });
});
