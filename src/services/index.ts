import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { queryConfigs } from "./queryConfigs";
import {
  AddTodoRequest,
  DeleteTodoRequest,
  GetTodosResponse,
  Todo,
  UpdateTodoRequest,
} from "@/services/types";

export const useGetTodos = (
  options?: UseQueryOptions<GetTodosResponse, Error >
) => {
  return useQuery({
    queryKey: queryConfigs.getTodos().queryKey,
    queryFn: queryConfigs.getTodos().queryFn,
    ...options,
  });
};

export const useAddTodo = (
  options?: UseMutationOptions<Todo, Error, AddTodoRequest>
) => {
  return useMutation({
    mutationFn: (body: AddTodoRequest) => queryConfigs.addTodo().queryFn(body),
    ...options,
  });
};

export const useDeleteTodo = (
  options?: UseMutationOptions<Todo, Error, DeleteTodoRequest>
) => {
  return useMutation({
    mutationFn: (body: DeleteTodoRequest) =>
      queryConfigs.deleteTodo().queryFn(body),
    ...options,
  });
};

export const useUpdateTodo = (
  options?: UseMutationOptions<Todo, Error, UpdateTodoRequest>
) => {
  return useMutation({
    mutationFn: (body: UpdateTodoRequest) =>
      queryConfigs.updateTodo().queryFn(body),
    ...options,
  });
};
