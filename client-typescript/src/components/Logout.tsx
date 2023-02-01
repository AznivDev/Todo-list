import React from "react";
import withRouter from "../withRouter";
import "../styles/logout.scss";

interface IProps {
  router: {
    navigate: (path: string) => void;
  };
}

class Logout extends React.Component<IProps> {
  render() {
    return (
      <div
        onClick={() => {
          localStorage.removeItem("token");
          this.props.router.navigate("/auth/signin");
        }}
        className="logoutContainer"
      >
        <p className="logoutText">Logout</p>
      </div>
    );
  }
}

export default withRouter(Logout);
