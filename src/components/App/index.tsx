import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'scss/application.scss';
import { ROUTES } from 'constants/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          {ROUTES.map(({ path, name, component }) => (
            <Route key={name} path={path} component={component} exact />
          ))}
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
