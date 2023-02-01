import React from "react";
import Header from "../components/Header";
import "../styles/home.scss";

class Home extends React.Component {
  render() {
    return (
      <div className="homeWrapper">
        <Header />
        <div className="homeContainer">
          <p className="homeText">
            You can manage your tasks more easily if you have a todo list :)
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
