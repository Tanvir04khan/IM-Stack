import React, { FormEvent } from "react";
import { Label } from "./ui/label";
import { Switch as SCNSwitch } from "./ui/switch";

type SwitchPropsType = {
  lable: string;
  value: boolean;
  onChange: (e: FormEvent<HTMLButtonElement>) => void;
};

const Switch = ({ lable, value, onChange }: SwitchPropsType) => {
  return (
    <div className="flex items-center gap-2">
      <Label>{lable}</Label>
      <SCNSwitch
        className="cursor-pointer"
        checked={value}
        onClick={onChange}
      />
    </div>
  );
};

export default Switch;
