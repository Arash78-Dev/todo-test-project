import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

interface TodoBoxProps {
  onAddTodo: (todo: string) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

const AddTodoBox = ({ onAddTodo, onCancel, onSuccess }: TodoBoxProps) => {
  const [todo, setTodo] = useState("");
    
  return (
    <div className="flex p-4 gap-4  rounded-lg shadow-md  flex-nowrap items-center">
      <Input
        placeholder="Add Todo"
        value={todo}
        onValueChange={(newValue) => setTodo(newValue)}
      />

      <Button onClick={() => {
        onCancel()
        setTodo("")
      }}>
        <BiX />
      </Button>

      <Button
        onClick={() => {
          onAddTodo(todo);
          setTodo("");
          onSuccess();
        }}
        className="text-green-500 hover:text-green-500"
      >
        <BiCheck />
      </Button>
    </div>
  );
};

export default AddTodoBox;
