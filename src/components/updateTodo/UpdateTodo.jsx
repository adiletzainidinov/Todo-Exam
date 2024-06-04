import React from "react";
import TodoForm from "../todoForm";
import { useDispatch, useSelector } from "react-redux";
import { editTodoList } from "../../store/slice/todoSlice";

export default function UpdateTodo({ data }) {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todoList.todo);

  function editHandler(data) {
    dispatch(editTodoList(data));
  }
  return (
    <div>
      <TodoForm
        onSubmit={editHandler}
        data={todo}
        buttonValue="Save"
        nameValue="Edit"
        color="blue"
      />
      ;
    </div>
  );
}
