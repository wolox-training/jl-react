import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import 'scss/application.scss';
import SignUp from 'screens/SignUp/index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SignUp />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
