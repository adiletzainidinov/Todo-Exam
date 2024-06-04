import { createBrowserRouter } from "react-router-dom";
import UpdateTodo from "../components/updateTodo/UpdateTodo";
import CreateTodo from "../components/createTodo/CreateTodo";
import TodoList from "../components/todoList";

export const router = createBrowserRouter([
  { path: "/", element: <TodoList /> },
  { path: "updateTodo", element: <UpdateTodo /> },
  { path: "createTodo", element: <CreateTodo /> },
]);
