import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import SignUp from '.';

describe('SignUp', () => {
  it('test', async () => {
    // GIVEN
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    // TODO: here comes the test
    await waitFor(() => {
      expect(screen.getByText('...')).toBeInTheDocument();
    });
  });
});
