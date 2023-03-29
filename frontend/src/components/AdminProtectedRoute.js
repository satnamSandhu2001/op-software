import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminProtectedRoute = (props) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate replace to="/login" />;
  }

  return loading === false && <Outlet />;
};

export default AdminProtectedRoute;
