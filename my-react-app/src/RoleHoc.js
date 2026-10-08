import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleHoc = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { user } = props;

    if (!user) {
      return <Navigate to="/login" />;
    }

    // if (!allowedRoles.includes(user.role)) {
    //   return <Navigate to="/unauthorized" />;
    // }

    return <WrappedComponent {...props} />;
  };
};

export default RoleHoc;
