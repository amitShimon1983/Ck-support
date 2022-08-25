import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { appContextVar } from '..';
import { useReactiveVar } from '../hooks/apollo';

const RequireAuth = ({ children, baseUrl }: { children: React.ReactNode; baseUrl: string }) => {
  const location = useLocation();
  const { isAuthenticate } = useReactiveVar(appContextVar);
  if (!isAuthenticate) {
    return <Navigate to={`${baseUrl ? baseUrl + '/' : ''}login`} state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default RequireAuth;
