import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}

export default function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  const Token = localStorage.getItem('Authorization');
  if (authentication) {
    return Token === null ? <Navigate to='/' /> : <Outlet />;
  } else {
    return Token === null ? <Outlet /> : <Navigate to='/map' />;
  }
}
