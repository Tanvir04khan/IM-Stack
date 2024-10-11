import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { AlertDescription, AlertTitle, Alert as CnAlert } from "./ui/alert";
import { useTheme } from "./theme/theme-provider";

type AlertProps = {
  variant: "default" | "destructive";
  title: string;
  description: string;
  className?: string;
};

const Alert = ({ variant, title, description, className }: AlertProps) => {
  const { theme } = useTheme();
  return (
    <div className="w-full flex justify-center items-center fixed top-10 left-0">
      <CnAlert variant={variant} className={`${className} w-1/2 ${theme}`}>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </CnAlert>
    </div>
  );
};

export default Alert;
