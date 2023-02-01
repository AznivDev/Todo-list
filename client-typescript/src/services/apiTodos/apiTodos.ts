async function handleGetTodos() {
  // let data: Record<string, string>;
  let data: any;
  try {
    data = await fetch("http://localhost:17000/todos", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
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

export { handleGetTodos };
