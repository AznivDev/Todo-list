import React from "react";
const wrapperComponent = (WrapperComponent) => {
  class HOC extends React.Component {
    render() {
      return <div>X</div>;
    }
  }
  return HOC;
};

export default wrapperComponent;
