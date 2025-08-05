import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const RedirectToDashboard = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (aToken) return <Navigate to="/admin-dashboard" />;
  if (dToken) return <Navigate to="/doctor-dashboard" />;
  return <Navigate to="/login" />;
};

export default RedirectToDashboard;
