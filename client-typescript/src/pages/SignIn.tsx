import React from "react";
import SignInImage from "../images/sign_in.svg";
import validateEmail from "../validate";
import withRouter from "../withRouter";
import Header from "../components/Header";
import "../styles/signIn.scss";

interface IProps {
  router: {
    navigate: (path: string) => void;
  };
}
type IState = {
  name: string;
  mail: string;
  password: string;
  errorText: string;
};

class SignIn extends React.Component<IProps, IState> {
  state = {
    name: "",
    mail: "",
    password: "",
    errorText: "",
  };
  //functionality for sign in
  async handleSignIn() {
    this.handleValidate();
    const { name, password, mail } = this.state;

    const response = await fetch("http://localhost:17000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        mail,
      }),
    });
    if (!response.ok) {
      this.setState({ errorText: "User not found." });
      throw new Error("Something went wrong");
    }
    let data = await response.json();
    localStorage.setItem("token", data);
    this.props.router.navigate("/todos");
  }
  //Validate input fields
  handleValidate() {
    if (this.state.name.length < 2) {
      this.setState({ errorText: "Name must have at least 2 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
    if (this.state.password.length < 6) {
      this.setState({ errorText: "Password must have at least 6 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
    if (validateEmail(this.state.mail) === false) {
      this.setState({ errorText: "Invalid mail format." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
  }
  //Change the value of the state when data is entered in the corresponding input field
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    }
    if (e.target.name === "mail") {
      this.setState({ mail: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }
  render() {
    return (
      <div className="signInWrapper">
        <Header />
        <div className="signInBody">
          <div className="svgContainer">
            <img src={SignInImage} className="signInImg" alt="Sign in image" />
          </div>
          <div className="fieldsContainer">
            <div className="signInFields">
              <p className="signInTitle">Sign in</p>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="signInField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="signInField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <input
                type="email"
                name="mail"
                placeholder="email"
                className="signInField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <div className="errorSendContainer">
                <p className="errorField">{this.state.errorText}</p>
                <button
                  className="signInButton"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleSignIn();
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
