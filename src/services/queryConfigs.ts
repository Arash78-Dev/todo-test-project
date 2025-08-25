import httpClient from "@/services/httpClient";
import {
  AddTodoRequest,
  DeleteTodoRequest,
  GetTodosResponse,
  Todo,
  UpdateTodoRequest,
} from "@/services/types";

export const urls = {
  todos: "/todos",
  addTodo: "/todos/add",
  deleteTodo: (id: string) => `/todos/${id}`,
  updateTodo: (id: string) => `/todos/${id}`,
};

const keys = {
  getTodos: ["todos"],
};

export const queryConfigs = {
  getTodos: () => ({
    queryKey: keys.getTodos,
    queryFn: async () =>
      httpClient<GetTodosResponse>({
        url: urls.todos,
        method: "GET",
      }),
  }),

  addTodo: () => ({
    queryFn: (body: AddTodoRequest) =>
      httpClient<Todo>({
        url: urls.addTodo,
        method: "POST",
        data: body,
      }),
  }),

  deleteTodo: () => ({
    queryFn: (request: DeleteTodoRequest) =>
      httpClient<Todo>({
        url: urls.deleteTodo(request.query.todoId),
        method: "DELETE",
      }),
  }),

  updateTodo: () => ({
    queryFn: (request: UpdateTodoRequest) =>
      httpClient<Todo>({
        url: urls.updateTodo(request.query.todoId),
        method: "PUT",
        data: request.body,
      }),
  }),
};
