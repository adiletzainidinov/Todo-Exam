import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../util/URL";

const initialState = {
  data: [],
  todo: {},
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todoList",
  initialState: initialState,
  reducers: {
    editingTodo(state, action) {
      state.todo = state.data.find((item) => item.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addPostTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPostTodoList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPostTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodoList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(editTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodoList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(complatedTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(complatedTodoList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(complatedTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectTodo = (state) => state.todoList.data;
export const selectLoading = (state) => state.todoList.isLoading;
export const selectComlated = (state) => state.todoList.data.isComplated;

export const editingTodo = todoSlice.actions.editingTodo;
export default todoSlice.reducer;

export const getTodoList = createAsyncThunk(
  "todoList/getTodoList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      const transformedBooks = [];
      for (const key in data) {
        transformedBooks.push({
          id: key,
          value: data[key].value,
          date: data[key].date,
          isComplated: data[key].isComplated,
        });
      }
      return transformedBooks;
    } catch (error) {
      return rejectWithValue(error.messager);
    }
  }
);

export const addPostTodoList = createAsyncThunk(
  "todoList/postTodoList",
  async (newData, thunkApi) => {
    console.log(newData);
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newData),
      });
      thunkApi.dispatch(getTodoList());
    } catch (error) {
      return thunkApi.rejectWithValue(error.messager);
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  "todoList/deleteTodoList",
  async (id, thunkApi) => {
    try {
      await fetch(
        `https://examen-c1cd8-default-rtdb.firebaseio.com/todoList/${id}.json`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(getTodoList());
    } catch (error) {
      return thunkApi.rejectWithValue(error.messager);
    }
  }
);

export const editTodoList = createAsyncThunk(
  "todoList/editTodoList",
  async (data, thunkApi) => {
    const { id, ...rest } = data;
    console.log(data);
    try {
      await fetch(
        `https://examen-c1cd8-default-rtdb.firebaseio.com/todoList/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(rest),
        }
      );
      thunkApi.dispatch(getTodoList());
    } catch (error) {
      return thunkApi.rejectWithValue(error.messager);
    }
  }
);

export const complatedTodoList = createAsyncThunk(
  "todoList/complatedTodoList",
  async (data, thunkApi) => {
    console.log(data);
    try {
      await fetch(
        `https://examen-c1cd8-default-rtdb.firebaseio.com/todoList/${data.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...data, isComplated: !data.isComplated }),
        }
      );
      thunkApi.dispatch(getTodoList());
    } catch (error) {
      return thunkApi.rejectWithValue(error.messager);
    }
  }
);
