import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { routes } from 'core/routes';
import { useAuth } from 'core/hooks/auth';

interface RequireAuthProps {
  children: React.ReactElement;
}

export const RequireAuth = (props: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user.isAuth) {
    return <Navigate to={routes.login()} state={{ from: location }} />;
  }

  return props.children;
};
