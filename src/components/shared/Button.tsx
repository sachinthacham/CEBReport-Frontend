import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  color?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
  children,
  color = "bg-blue-500",
  width = "w-auto",
  height = "h-auto",
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white px-4 py-2 rounded ${color} ${width} ${height} ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
