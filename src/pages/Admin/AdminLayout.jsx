import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const AdminLayout = () => {
  const { isAdmin } = useGlobal();

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
