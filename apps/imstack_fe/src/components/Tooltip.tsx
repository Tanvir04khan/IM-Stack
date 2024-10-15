import React, { ReactNode } from "react";
import {
  Tooltip as SCNTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type TooltipPropsType = {
  children: ReactNode;
  content: ReactNode;
};

const Tooltip = ({ content, children }: TooltipPropsType) => {
  return (
    <TooltipProvider>
      <SCNTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-gray-900 text-white">
          <p>{content}</p>
        </TooltipContent>
      </SCNTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
