import { useDispatch } from "react-redux";
import { getTodoList } from "./store/slice/todoSlice";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
