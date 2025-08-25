import { useDeleteTodoLogic } from "@/shared/widget/TodoBox/logic/delete";
import { useToggleTodoStatusLogic } from "@/shared/widget/TodoBox/logic/toggleStatus";
import Button from "@/shared/components/Button";
import {
  BiCheck,
  BiCheckCircle,
  BiCircle,
  BiEdit,
  BiTrash,
  BiX,
} from "react-icons/bi";
import { HashLoader } from "react-spinners";
import { useUpdateTodoLogic } from "@/shared/widget/TodoBox/logic/update";
import { useState } from "react";
import Input from "@/shared/components/Input";

interface TodoBoxProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoBox = ({ id, title, isCompleted }: TodoBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { handleDeleteTodo, isPending: isDeleting } = useDeleteTodoLogic();
  const { handleUpdateTodo, isPending: isUpdating } = useUpdateTodoLogic();
  const {
    handleToggleTodoStatus,
    isPending: isToggling,
    toggleTodoVariables,
  } = useToggleTodoStatusLogic();

  const isCompletedOptimistic = isToggling
    ? toggleTodoVariables?.body?.completed
    : isCompleted;

  const titleOptimistic = isUpdating ? editedTitle : title;

  return (
    <div className="flex p-4 gap-4 bg-gray-200 rounded-lg shadow-md w-full flex-nowrap items-center">
      <Button
        className={`${
          isCompletedOptimistic
            ? "text-green-500 hover:text-green-500"
            : "text-gray-500"
        } h-8 w-8 flex items-center justify-center`}
        onClick={() => handleToggleTodoStatus(id, !isCompleted)}
        disabled={isToggling}
      >
        {isCompletedOptimistic ? (
          <BiCheckCircle size={20} />
        ) : (
          <BiCircle size={20} />
        )}
      </Button>

      {isEditing ? (
        <div className="flex-3 text-black">
          <Input
            value={editedTitle}
            placeholder="Edit todo"
            className="w-full !py-0"
            onValueChange={(value) => setEditedTitle(value)}
            rightIcon={
              <div className="flex">
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(title);
                  }}
                  className="text-red-500 hover:text-red-500"
                >
                  <BiX size={20} />
                </Button>

                <Button
                  onClick={() => {
                    setIsEditing(false);
                    handleUpdateTodo(id, editedTitle);
                  }}
                  className="text-green-500 hover:text-green-500"
                >
                  <BiCheck size={20} />
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <div
          className={`text-md  font-bold text-black  whitespace-pre-wrap flex-3 ${
            isCompletedOptimistic ? "line-through" : ""
          }`}
        >
          {titleOptimistic}
        </div>
      )}

      <div className="flex gap-1 flex-1 justify-end items-center">
        {!isEditing && (
          <Button
            className="text-blue-500 hover:text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            <BiEdit size={20} />
          </Button>
        )}

        <Button
          className="text-red-500 hover:text-red-500"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this todo?")) {
              handleDeleteTodo(id);
            }
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <HashLoader color="red" size={20} />
          ) : (
            <BiTrash size={20} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default TodoBox;
