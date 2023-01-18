import React from "react";
import SignUpImage from "../images/sign_up.svg";
import Header from "../components/Header";
import validateEmail from "../validate";
import withRouter from "../withRouter ";
import "../styles/signUp.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      password: "",
      repeatPassword: "",
      errorText: "",
    };
  }
  //functionality for sign up
  async handleSignup() {
    this.handleValidate();
    try {
      if (this.state.password === this.state.repeatPassword) {
        const response = await fetch("http://localhost:17000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            mail: this.state.mail,
          }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        this.props.router.navigate("/auth/signin");
        return await response.json();
      } else {
        this.setState({ errorText: "Passwords are not matches." });
        setTimeout(() => {
          this.setState({ errorText: "" });
        }, 2000);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Validate input fields
  handleValidate() {
    if (this.state.name.length < 2) {
      this.setState({ errorText: "Name must have at least 1 characters." });
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
  handleChange(e) {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    }
    if (e.target.name === "mail") {
      this.setState({ mail: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
    if (e.target.name === "repeatPassword") {
      this.setState({ repeatPassword: e.target.value });
    }
  }
  render() {
    return (
      <div className="signUpWrapper">
        <Header />
        <div className="signUpBody">
          <div className="svgContainer">
            <img src={SignUpImage} className="signUpImg" alt="Sign up image" />
          </div>
          <div className="fieldsContainer">
            <div className="signUpFields">
              <p className="signUpTitle">Sign up</p>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="signUpField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="signUpField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <input
                type="password"
                name="repeatPassword"
                placeholder="repeat password"
                className="signUpField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <input
                type="email"
                name="mail"
                placeholder="email"
                className="signUpField"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <div className="errorSendContainer">
                <p name="errorText" className="errorField">
                  {this.state.errorText}
                </p>
                <button
                  className="signUpButton"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleSignup();
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
