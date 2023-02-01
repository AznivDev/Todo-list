import React from "react";
import { Outlet, Navigate } from "react-router-dom";

class LoginLeyout extends React.Component {
  render() {
    if (localStorage.getItem("token")) {
      return <Navigate to="/todos" />;
    }
    return <Outlet />;
  }
}

export default LoginLeyout;
