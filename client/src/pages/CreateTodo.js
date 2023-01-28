import React from "react";
import Header from "../components/Header";
import withRouter from "../withRouter ";
import "../styles/createTodo.scss";

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      title: "",
      details: "",
      errorText: "",
    };
  }
  //Functionality for create todo
  async handleCreateTodo() {
    this.handleValidate();
    await fetch("http://localhost:17000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: this.state.title,
        details: this.state.details,
      }),
    });
    this.props.router.navigate("/todos");
  }
  //Change the value of the state when data is entered in the corresponding input field
  handleChange(e) {
    if (e.target.name === "title") {
      this.setState({ title: e.target.value });
    }
    if (e.target.name === "details") {
      this.setState({ details: e.target.value });
    }
  }
  //Validate input fields
  handleValidate() {
    if (this.state.title.length < 1) {
      this.setState({ errorText: "Title must have at least 1 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
    if (this.state.details.length < 6) {
      this.setState({ errorText: "Details must have at least 6 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
  }
  render() {
    return (
      <div className="todosWrapper">
        <Header />
        <p className="todosTitle">Create todo</p>
        <div className="createTodoContainer">
          <label htmlFor="title" className="todosLabel">
            Greate todo title
            <input
              type="text"
              name="title"
              id="title"
              className="todosInput"
              placeholder="Todo title"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
          </label>
          <label htmlFor="details" className="todosLabel">
            Greate todo details
            <textarea
              type="text"
              name="details"
              id="details"
              className="todosInput"
              placeholder="Todo details"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
          </label>
          <div className="errorCreateContainer">
            <p name="errorText" className="errorField">
              {this.state.errorText}
            </p>
            <button
              className="createTodo"
              onClick={(e) => {
                e.preventDefault();
                this.handleCreateTodo();
              }}
            >
              Create todo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateTodo);
