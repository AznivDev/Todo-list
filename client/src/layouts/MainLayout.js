import React from "react";
import { Outlet } from "react-router-dom";

class MainLeyout extends React.Component {
  render() {
    return (
      <div className="homeWrapper">
        <Outlet />
      </div>
    );
  }
}
export default MainLeyout;
