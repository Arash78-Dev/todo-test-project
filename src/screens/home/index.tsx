import TodoBox from "@/shared/widget/TodoBox";
import { useAddTodoLogic, useGetTodosLogic } from "@/screens/home/logic";
import { useState } from "react";
import AddTodoBox from "@/screens/home/ui/AddTodoBox";
import FilterBox from "@/screens/home/ui/FilterBox";
import ShowTodoList from "@/screens/home/ui/ShowTodoList";
import { Todo } from "@/services/types";

export default function HomePage() {
  const {
    data,
    isLoading,
    setSearch,
    search,
    setCompletedFilter,
    completedFilter,
  } = useGetTodosLogic();

  const [isAdding, setIsAdding] = useState(false);
  const { handleAddTodo, isPending, addTodoVariables } = useAddTodoLogic();

  const optimisticTodo: Todo | null =
    isPending && addTodoVariables
      ? {
          id: Number(addTodoVariables.todo),
          todo: addTodoVariables.todo,
          completed: addTodoVariables.completed,
          userId: 1,
        }
      : null;

  const optimisticData = optimisticTodo ? [optimisticTodo, ...data] : data;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-[40%]">
        <div className="text-2xl font-bold">To Do List</div>

        <FilterBox
          setSearch={setSearch}
          search={search}
          setCompletedFilter={setCompletedFilter}
          completedFilter={completedFilter}
          isAdding={isAdding}
          onAddTodo={() => setIsAdding((prev) => !prev)}
        />

        <div className="h-[80%] overflow-hidden flex flex-col  w-full">
          {/* <div
            className={`${
              isAdding ? "h-20 opacity-100" : "h-0 opacity-0"
            } transition-all duration-400 ease`}
          >
            <AddTodoBox
              onAddTodo={handleAddTodo}
              onCancel={() => setIsAdding(false)}
              onSuccess={() => setIsAdding(false)}
            />
          </div> */}

          <div className="overflow-y-auto h-full">
            <ShowTodoList data={optimisticData ?? []} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
