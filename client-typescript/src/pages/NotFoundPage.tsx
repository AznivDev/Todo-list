import React from "react";
import notFound from "../images/notFound.png";
import Header from "../components/Header";
import "../styles/notFoundPage.scss";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="nofFoundWrapper">
        <Header />
        <div className="nofFoundContainer">
          <img className="notFoundImage" src={notFound} />
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
