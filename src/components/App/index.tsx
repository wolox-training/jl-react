import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import 'scss/application.scss';
import SignUp from 'screens/SignUp/index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  );
}

export default App;
