import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { isLogged } from 'services/UsersService';

type RouteHandlerProps = {
  isPublic: boolean;
} & RouteProps;

function RouteHandler({ isPublic, ...props }: RouteHandlerProps) {
  if (isPublic) {
    return isLogged() ? <Redirect to="/home" /> : <Route {...props} />;
  }
  return isLogged() ? <Route {...props} /> : <Redirect to="/" />;
}

export default RouteHandler;
