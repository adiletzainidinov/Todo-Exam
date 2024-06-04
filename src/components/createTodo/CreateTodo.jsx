import React from "react";
import TodoForm from "../todoForm";
import { useDispatch } from "react-redux";
import { addPostTodoList } from "../../store/slice/todoSlice";

export default function CreateTodo() {
  const dispatch = useDispatch();

  function addNewTodo(newTodos) {
    const { id, ...rest } = newTodos;
    dispatch(addPostTodoList(rest));
  }
  return (
    <TodoForm
      onSubmit={addNewTodo}
      buttonValue="Add"
      nameValue="Add Todo"
      color="green"
    />
  );
}
