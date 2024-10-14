import React from "react";
import { Label } from "./ui/label";
import { Input as SCNInput } from "./ui/input";

type InputPropsType = {
  type: "file" | "text" | "image" | "number" | "date";
  lable: string;
  placeholder?: string;
  accept?: string;
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
}: InputPropsType) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{lable}</Label>
      <SCNInput
        className="border rounded-md px-3 py-2 w-full"
        placeholder={placeholder}
        type={type}
        accept={accept}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
