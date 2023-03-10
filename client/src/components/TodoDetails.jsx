import React from "react";
import { Outlet, Navigate } from "react-router-dom";

class TodoDetails extends React.Component {
  render() {
    if (!localStorage.getItem("Token")) {
      return <Navigate to="/todos" />;
    }
    return <Outlet />;
  }
}

export default TodoDetails;
