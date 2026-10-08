import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleHoc = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const user = "admin"
        if (!user) {
            return <Navigate to="/unauthorized" />;
        }

        if (!allowedRoles.includes(user)) {
          return <Navigate to="/unauthorized" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default RoleHoc;
