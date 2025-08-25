import DebounceInput from "@/shared/components/DebounceInput";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";

interface FilterBoxProps {
  setSearch: (value: string) => void;
  search: string;
  setCompletedFilter: (value: "all" | "completed" | "incomplete") => void;
  completedFilter: "all" | "completed" | "incomplete";
  onAddTodo: () => void;
  isAdding: boolean;
}

const FilterBox = ({
  setSearch,
  search,
  setCompletedFilter,
  completedFilter,
  onAddTodo,
  isAdding,
}: FilterBoxProps) => {
  return (
    <div className="flex justify-between w-full gap-4">
      <DebounceInput
        onValueChange={(value) => setSearch(value)}
        value={search}
        placeholder="Search"
      />

      <div className="flex gap-2">
        <Select
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) =>
            setCompletedFilter(
              e.target.value as "all" | "completed" | "incomplete"
            )
          }
          value={completedFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Incomplete", value: "incomplete" },
          ]}
        />
      </div>

      <Button
        onClick={onAddTodo}
        className={`${
          isAdding ? "bg-green-500 text-white" : ""
        }`}
      >
        Add
      </Button>
    </div>
  );
};

export default FilterBox;
