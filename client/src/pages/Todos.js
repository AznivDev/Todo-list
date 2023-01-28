import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { handleGetTodos } from "../services/apiTodos/apiTodos";
import withRouter from "../withRouter ";
import "../styles/todos.scss";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      title: "",
      details: "",
      deleteClicked: false,
    };
  }
  componentDidMount() {
    this.getTodos();
  }
  //Get user's todos.
  async getTodos() {
    let res = await handleGetTodos();
    this.setState({
      todoList: res,
    });
  }
  //Delete user's todo.
  async handleDeleteTodo(id) {
    try {
      await fetch(`http://localhost:17000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    this.getTodos();
  }
  //Validate input fields
  handleValidate() {
    if (this.state.title.length === 0) {
      this.setState({ errorText: "Name must have at least 1 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
    if (this.state.details.length === 0) {
      this.setState({ errorText: "Name must have at least 1 characters." });
      setTimeout(() => {
        this.setState({ errorText: "" });
      }, 2000);
    }
  }
  render() {
    return (
      <div className="todosWrapper">
        <Header />
        <div className="todosPage">
          <p className="todosTitle">My todos list</p>
          {!this.state.todoList.length ? (
            <div className="noTodos">
              <p>Your todo list is empty.</p>
            </div>
          ) : (
            <table className="todosContainer">
              <thead className="todoHead">
                <tr className="todosItem">
                  <th>Title</th>
                  <th>Details</th>
                  <th>Proccess</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody className="todoBody">
                {this.state.todoList.map((todo) => (
                  <tr className="todosItem" key={todo.id}>
                    <td className="todoTitle">{todo.title}</td>
                    <td className="todoText">{todo.details}</td>
                    <td
                      className={
                        todo.done ? "todoProccess done" : "todoProccess panding"
                      }
                    >
                      {todo.done === false ? "panding" : "done"}
                    </td>
                    <td className="todoButtons">
                      <Link to={`/todos/${todo.id}`}>
                        <BiEditAlt className="todoEdit" />
                      </Link>
                      <RiDeleteBin6Line
                        className="todoDelete"
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleDeleteTodo(todo.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Todos);
