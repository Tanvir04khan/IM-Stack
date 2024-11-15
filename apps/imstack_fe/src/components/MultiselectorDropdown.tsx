import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Label } from "./ui/label";

type MultiselectorDropdownPropsType = {
  label: string;
  options: { id: string; value: string }[];
  placeholder: string;
  onSelect: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
  values: { id: string; value: string }[];
  isMandatory?: boolean;
};

const MultiSelectDropdown = ({
  options,
  label: fieldLable,
  placeholder,
  values,
  onSelect,
  isMandatory,
}: MultiselectorDropdownPropsType) => {
  // Handle selecting/deselecting options
  const handleOptionChange = (option: { id: string; value: string }) => {
    onSelect((prevSelected) =>
      prevSelected.some(({ id: prSlId }) => prSlId === option.id)
        ? prevSelected.filter(({ id: prSlId }) => prSlId !== option.id)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>
        {fieldLable} {isMandatory && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between text-muted-foreground cursor-pointer h-9 border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border rounded-md px-3 py-2 w-full">
            <p>
              {values?.length > 0
                ? values.map(({ value }) => value).join(", ")
                : placeholder}
            </p>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="flex flex-col gap-2">
            {options.map(({ id, value }) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values?.some(({ id: sId }) => sId === id)}
                  onChange={() => handleOptionChange({ id, value })}
                  id={id}
                />
                <label htmlFor={id} className="text-sm">
                  {value}
                </label>
                {values.some(({ id: sId }) => sId === id) && (
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
