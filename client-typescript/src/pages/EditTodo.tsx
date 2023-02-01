import React from "react";
import { handleGetTodo } from "../services/apiTodos/apiTodo";
import { Todo } from "../types/todo";
import Header from "../components/Header";
import withRouter from "../withRouter";
import "../styles/todos.scss";
import "../styles/editTodo.scss";

interface IProps {
  router: {
    navigate: (path: string) => void;
    params: {
      id: string;
    };
  };
}

type IState = {
  title: string;
  details: string;
  todo: Todo[];
  checked: boolean;
};
class EditTodo extends React.Component<IProps, IState> {
  state = {
    title: "",
    details: "",
    todo: [],
    checked: false,
  };

  componentDidMount() {
    this.getTodo();
  }
  //Change todo's state done or pending.
  handleCheck() {
    !!this.state.checked
      ? this.setState({
          checked: false,
        })
      : this.setState({
          checked: true,
        });
  }
  //Get user's todo list after changing one todo.
  async getTodo() {
    let id = this.props.router.params.id;
    let res = await handleGetTodo(id);
    let arr = [];
    if (res) {
      arr.push(res as Todo);
    }
    this.setState({
      checked: arr[0].done,
    });
    this.setState({
      todo: arr,
    });
  }
  //Edit user's one todo.
  async handleEditTodo(id: string) {
    try {
      await fetch(`http://localhost:17000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id,
          title: this.state.title,
          details: this.state.details,
          done: this.state.checked,
        }),
      });
      console.log("handleEditTodo", this.state.checked);
      this.props.router.navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  }
  //Change the value of the state when data is entered in the corresponding input field
  handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value } as unknown as IState);
  }
  render() {
    let id = this.props.router.params.id;
    return (
      <div className="todosWrapper">
        <Header />
        <p className="todosTitle">Edit todo</p>

        {this.state.todo.map((item: Todo) => (
          <div className="createTodoContainer" key={item.id}>
            <input
              name="title"
              className="todosInput"
              defaultValue={item.title}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <input
              name="details"
              className="todosInput"
              defaultValue={item.details}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <div className="checkboxContainer">
              <p className="checkboxText">Is done this todo?</p>
              <input
                type="checkbox"
                name="done"
                checked={this.state.checked}
                onChange={() => {
                  this.handleCheck();
                }}
              />
            </div>
            <button
              className="editTodo"
              onClick={(e) => {
                e.preventDefault();
                this.handleEditTodo(id);
              }}
            >
              Edit todo
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(EditTodo);
