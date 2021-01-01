import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    userState: { isAuthenticated },
  } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
