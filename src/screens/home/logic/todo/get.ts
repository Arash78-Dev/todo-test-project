import { useGetTodos } from "@/services";
import { useAppDispatch, useAppSelector } from "@/store";
import { addTodos } from "@/store/todoSlice";
import { useEffect, useState } from "react";

export const useGetTodosLogic = () => {
  const { data: todosResponse, isLoading } = useGetTodos();
  const [completedFilter, setCompletedFilter] = useState<
    "all" | "completed" | "incomplete"
  >("all");

  const [search, setSearch] = useState<string>("");

  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (
      search.length > 0 &&
      !todo.todo.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    if (completedFilter === "all") return true;
    if (completedFilter === "completed") return todo.completed;
    if (completedFilter === "incomplete") return !todo.completed;
  });

  useEffect(() => {
    if (todos.length > 0) return;
    if (todosResponse) {
      dispatch(addTodos(todosResponse.todos));
    }
  }, [dispatch, todosResponse, todos.length]);

  return {
    data: filteredTodos,
    isLoading,
    setCompletedFilter,
    completedFilter,
    setSearch,
    search,
  };
};
