import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Todos from "./pages/Todos";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginLayout from "./layouts/LoginLayout";
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/:id" element={<EditTodo />} />
          <Route path="/createTodo" element={<CreateTodo />} />
          <Route path="/download" element={<Todos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
