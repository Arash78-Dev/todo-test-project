import { Todo } from "@/services/types";
import TodoBox from "@/shared/widget/TodoBox";
import { useAppDispatch } from "@/store";
import { addTodos } from "@/store/todoSlice";
import { Reorder, useMotionValue } from "framer-motion";

interface ShowTodoListProps {
  data: Todo[];
  isLoading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const ShowTodoList = ({ data, isLoading }: ShowTodoListProps) => {
  const dispatch = useAppDispatch();

  return isLoading ? (
    <div className="flex items-center justify-center h-full">loading...</div>
  ) : data.length > 0 ? (
    <Reorder.Group
      values={data}
      axis="y"
      onReorder={(newOrder) => dispatch(addTodos(newOrder))}
    >
      {data?.map((todo) => (
        <Reorder.Item key={todo.id} value={todo}>
          <div className="mt-3">
            <TodoBox
              key={todo.id}
              id={todo.id.toString()}
              title={todo.todo}
              isCompleted={todo.completed}
            />
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  ) : (
    <div className="flex items-center justify-center h-full">
      No todos found
    </div>
  );
};

export default ShowTodoList;
