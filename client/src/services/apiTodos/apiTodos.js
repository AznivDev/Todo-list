async function handleGetTodos() {
  let data;
  try {
    data = await fetch("http://localhost:17000/todos", {
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
  } catch (error) {
    console.log(error);
  }
  return data;
}

export { handleGetTodos };
