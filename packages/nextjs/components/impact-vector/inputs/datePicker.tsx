import React from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}
export const DatePicker = ({ disabled = false, value, name, onChange }: IProps) => {
  return (
    <input
      className=" w-full pl-4 pr-4 lg:max-w-[180px] h-[40px] select-info select-bordered bg-secondary focus:outline-none border border-neutral hover:border-gray-400 rounded-lg text-neutral-500"
      name={name}
      disabled={disabled}
      value={value}
      type="date"
      onChange={e => onChange(e.target.value)}
    />
  );
};
