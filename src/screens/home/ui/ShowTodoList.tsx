import { Todo } from "@/services/types";
import TodoBox from "@/shared/widget/TodoBox";
import { useAppDispatch } from "@/store";
import { addTodos } from "@/store/todoSlice";
import { Reorder } from "framer-motion";

interface ShowTodoListProps {
  data: Todo[];
  isLoading?: boolean;
  hasFilter?: boolean;
}

const ShowTodoList = ({ data, isLoading, hasFilter }: ShowTodoListProps) => {
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
        <Reorder.Item key={todo.id} value={todo} dragListener={!hasFilter}>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <TodoBox
                key={todo.id}
                id={todo.id.toString()}
                title={todo.todo}
                isCompleted={todo.completed}
              />
            </div>
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
