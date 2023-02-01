import React from "react";
import { Outlet } from "react-router-dom";

class MainLayout extends React.Component {
  render() {
    return (
      <div className="homeWrapper">
        <Outlet />
      </div>
    );
  }
}

export default MainLayout;
