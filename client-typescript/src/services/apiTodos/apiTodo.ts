import { Todo } from "../../types/todo";

async function handleGetTodo(id: string) {
  let data: Todo;
  try {
    data = await fetch(`http://localhost:17000/todos/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { handleGetTodo };
