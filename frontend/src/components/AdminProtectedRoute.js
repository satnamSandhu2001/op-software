import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminProtectedRoute = (props) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  let location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Navigate replace to={`/login?redirect=${location.pathname.slice(1)}`} />
    );
  }

  return loading === false && <Outlet />;
};

export default AdminProtectedRoute;
