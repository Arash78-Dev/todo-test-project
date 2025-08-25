import { useDeleteTodo } from "@/services";
import { queryConfigs } from "@/services/queryConfigs";
import { useAppDispatch } from "@/store";
import { deleteTodo as deleteTodoAction } from "@/store/todoSlice";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteTodoLogic = () => {
  const { mutateAsync: deleteTodo, isPending, error } = useDeleteTodo();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (todoId: string) => {
    return deleteTodo(
      { query: { todoId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryConfigs.getTodos().queryKey,
          });

          dispatch(deleteTodoAction(Number(todoId)));
        },
      }
    );
  };

  return { handleDeleteTodo, isPending, error };
};
