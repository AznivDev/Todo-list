import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "../styles/header.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <Link className="homeLink" to="/">
          <p className="navbarText">Home</p>
        </Link>
        <div className="navbarButtons">
          {!!localStorage.getItem("token") ? (
            <div className="navigateComponent">
              <div className="navigateButtons">
                <Link className="navbarItem" to="/todos">
                  <p className="navbarText">Todos</p>
                </Link>
                <Link className="navbarItem" to="/createTodo">
                  <p className="navbarText">Create todo</p>
                </Link>
              </div>
              <Logout className="navbarItem" to="/" />
            </div>
          ) : (
            <div className="authButtons">
              <Link className="navbarItem" to="/auth/signup">
                <p className="navbarText">Sign up</p>
              </Link>
              <Link className="navbarItem" to="/auth/signin">
                <p className="navbarText">Singn in</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
