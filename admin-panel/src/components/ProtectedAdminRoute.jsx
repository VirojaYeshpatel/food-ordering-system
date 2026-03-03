import React from 'react';
import { hasAdminRole } from '../auth/firebaseAuth';

const ProtectedAdminRoute = ({ user, children }) => {
  // Role-based access placeholder.
  if (!user) {
    return <p>Please log in to access admin pages.</p>;
  }

  if (!hasAdminRole(user)) {
    return <p>Access denied. Admin role required.</p>;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
