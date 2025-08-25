import { useUpdateTodo } from "@/services";
import { queryConfigs } from "@/services/queryConfigs";
import { useAppDispatch } from "@/store";
import { updateTodoTitle } from "@/store/todoSlice";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateTodoLogic = () => {
  const {
    mutateAsync: updateTodo,
    variables: updateTodoVariables,
    error,
    isPending,
  } = useUpdateTodo();
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const handleUpdateTodo = (todoId: string, title: string) => {
    return updateTodo(
      {
        query: { todoId },
        body: { todo: title },
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: queryConfigs.getTodos().queryKey,
          });

          dispatch(
            updateTodoTitle({
              id: Number(response.id),
              title: response.todo,
            })
          );
        },
      }
    );
  };

  return { handleUpdateTodo, updateTodoVariables, error, isPending };
};
