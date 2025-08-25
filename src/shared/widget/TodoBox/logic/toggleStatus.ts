import { useUpdateTodo } from "@/services";
import { queryConfigs } from "@/services/queryConfigs";
import { useAppDispatch } from "@/store";
import { updateTodoCompleted } from "@/store/todoSlice";
import { useQueryClient } from "@tanstack/react-query";

export const useToggleTodoStatusLogic = () => {
  const {
    mutateAsync: updateTodo,
    variables: toggleTodoVariables,
    error,
    isPending,
  } = useUpdateTodo();
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const handleToggleTodoStatus = (todoId: string, completed: boolean) => {
    return updateTodo(
      {
        query: { todoId },
        body: { completed },
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: queryConfigs.getTodos().queryKey,
          });

          dispatch(
            updateTodoCompleted({
              id: Number(response.id),
              completed: response.completed,
            })
          );
        },
      }
    );
  };

  return { handleToggleTodoStatus, toggleTodoVariables, error, isPending };
};
