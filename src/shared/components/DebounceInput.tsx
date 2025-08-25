import Input, { InputProps } from "@/shared/components/Input";
import { useEffect, useState } from "react";

const DebounceInput = ({
  value: initialValue,
  onValueChange,
  placeholder,
  leftIcon,
  rightIcon,
}: InputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => onValueChange?.(value), 500);
    return () => clearTimeout(handler);
  }, [onValueChange, value]);

  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
};

export default DebounceInput;
