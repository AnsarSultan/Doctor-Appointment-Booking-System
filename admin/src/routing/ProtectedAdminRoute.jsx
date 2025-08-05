import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const ProtectedAdminRoute = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedAdminRoute;
