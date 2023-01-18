import React from "react";
import { Outlet, Navigate } from "react-router-dom";

class AuthLeyout extends React.Component {
  render() {
    if (localStorage.getItem("token")) {
      return <Outlet />;
    }
    return <Navigate to="/auth/signin" />;
  }
}
export default AuthLeyout;
