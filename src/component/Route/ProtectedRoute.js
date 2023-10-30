import React, { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateComponent = ({ isAdmin }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const auth = isAuthenticated;

  return (
    <Fragment>
      {loading === false && (
        auth ? <Outlet /> : isAdmin === true && user.role !== "admin" ? <Navigate to="/login" /> : <Navigate to="/login" />
      )}
    </Fragment>
  )
}

export default PrivateComponent;
