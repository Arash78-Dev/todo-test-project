import { Todo } from "@/services/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [
        { ...action.payload, id: state.todos.length + 226 },
        ...state.todos,
      ];
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    updateTodoTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.todo = action.payload.title;
      }
    },

    // Update todo completion status
    updateTodoCompleted: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },

    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const {
  addTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodoTitle,
  updateTodoCompleted,
  clearTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
