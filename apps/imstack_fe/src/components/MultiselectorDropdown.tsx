import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Label } from "./ui/label";

type MultiselectorDropdownPropsType = {
  label: string;
  options: string[];
  onSelect: (selected: string[]) => void;
};

const MultiSelectDropdown = ({
  options,
  label: fieldLable,
  onSelect,
}: MultiselectorDropdownPropsType) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Handle selecting/deselecting options
  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{fieldLable}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left">
            {selectedOptions.length > 0
              ? selectedOptions.join(", ")
              : "Select Options"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  id={option}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
                {selectedOptions.includes(option) && (
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
