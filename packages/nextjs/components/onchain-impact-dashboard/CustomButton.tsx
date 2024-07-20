import React from "react";
import { ICustomButton } from "~~/types";

const CustomButton: React.FC<ICustomButton> = ({ text, customClassName, children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={` items-center gap-1 justify-center  shadow-none ${customClassName}`}
      disabled={disabled}
    >
      {children}
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
