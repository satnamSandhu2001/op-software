import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return loading === false && <Outlet />;
};

export default ProtectedRoute;
