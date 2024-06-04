import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";

const store = configureStore({
  reducer: {
    todoList: todoSlice,
  },
});

export default store;
