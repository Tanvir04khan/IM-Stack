import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Label } from "./ui/label";

type MultiselectorDropdownPropsType = {
  label: string;
  options: string[];
  placeholder: string;
  onSelect: React.Dispatch<React.SetStateAction<string[]>>;
  value: string[];
};

const MultiSelectDropdown = ({
  options,
  label: fieldLable,
  placeholder,
  value,
  onSelect,
}: MultiselectorDropdownPropsType) => {
  // Handle selecting/deselecting options
  const handleOptionChange = (option: string) => {
    onSelect((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>{fieldLable}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between text-muted-foreground cursor-pointer h-9 border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border rounded-md px-3 py-2 w-full">
            <p>{value.length > 0 ? value.join(", ") : placeholder}</p>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  id={option}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
                {value.includes(option) && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectDropdown;
