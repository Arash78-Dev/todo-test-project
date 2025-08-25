export interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Input = ({
  value,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
  onValueChange,
  className,
}: InputProps) => {
  return (
    <div
      className={`flex gap-2 border border-gray-300 rounded-md p-2 w-full ${className}`}
    >
      {leftIcon && leftIcon}
      <input
        className="flex-1 outline-none"
        value={value}
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        placeholder={placeholder}
      />
      {rightIcon && rightIcon}
    </div>
  );
};

export default Input;
