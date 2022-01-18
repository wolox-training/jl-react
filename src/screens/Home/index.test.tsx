import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  describe('WoloxLogo', () => {
    it('should have a /home link', () => {
      const link = screen.getByRole('link');

      expect(link).toBeTruthy();
      expect(link).toHaveAttribute('href', '/home');
    });

    it('should display an image', () => {
      const img = screen.getByRole('img');

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', logoWoloxImg);
    });
  });

  describe('Logout button', () => {
    it('should display a logout button ', () => {
      const logoutButton = screen.getByRole('button');

      expect(logoutButton).toBeInTheDocument();
    });

    it('should redirect to / path', async () => {
      const logoutButton = screen.getByRole('button');

      userEvent.click(logoutButton);

      // eslint-disable-next-line max-nested-callbacks
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });
});
