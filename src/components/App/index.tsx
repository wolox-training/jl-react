import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import 'scss/application.scss';
import { ROUTES } from 'constants/routes';
import RouteHandler from 'components/RouteHandler';

const queryClient = new QueryClient();

function App() {
  const screens = ROUTES.map(({ path, component, name, isPublic }) => (
    <RouteHandler exact path={path} component={component} key={name} isPublic={isPublic} />
  ));
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>{screens}</Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
