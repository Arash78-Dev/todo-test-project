interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      className={`px-2 py-2 rounded-md ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } hover:bg-gray-300 hover:text-black transition-all duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
