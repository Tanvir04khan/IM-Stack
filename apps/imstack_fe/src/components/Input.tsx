import React from "react";
import { Label } from "./ui/label";
import { Input as SCNInput } from "./ui/input";

type InputPropsType = {
  type: "file" | "text" | "image" | "number" | "date";
  lable?: string;
  disabled?: boolean;
  placeholder?: string;
  accept?: string;
  className?: string;
  value?: string | undefined | number | readonly string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  lable,
  onChange,
  type,
  value,
  accept,
  placeholder,
  disabled,
  className,
}: InputPropsType) => {
  return (
    <div className={"flex flex-col gap-2 " + className}>
      <Label>{lable}</Label>
      <SCNInput
        className="border rounded-md px-3 py-2 w-full"
        placeholder={placeholder}
        type={type}
        accept={accept}
        value={value}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
