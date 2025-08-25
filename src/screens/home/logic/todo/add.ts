import { useAddTodo } from "@/services";
import { queryConfigs } from "@/services/queryConfigs";
import { useAppDispatch } from "@/store";
import { addTodo } from "@/store/todoSlice";
import { useQueryClient } from "@tanstack/react-query";

export const useAddTodoLogic = () => {
  const {
    mutateAsync: createTodo,
    variables: addTodoVariables,
    error,
    isPending,
  } = useAddTodo();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const handleAddTodo = (todo: string) => {
    return createTodo(
      { todo: todo, completed: false, userId: 1 },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: queryConfigs.getTodos().queryKey,
          });
          dispatch(addTodo(response));
        },
      }
    );
  };

  return { handleAddTodo, addTodoVariables, error, isPending };
};
