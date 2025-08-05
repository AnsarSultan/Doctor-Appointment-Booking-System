import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const ProtectedDoctorRoute = () => {
  const { dToken } = useContext(DoctorContext);
  return dToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedDoctorRoute;
