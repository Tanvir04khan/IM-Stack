import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { AlertDescription, AlertTitle, Alert as CnAlert } from "./ui/alert";
import { useTheme } from "./theme/theme-provider";
import { cn } from "@/lib/utils";

type AlertProps = {
  variant: "default" | "destructive";
  type: "Warning" | "Error" | "Success";
  title: string;
  description: string;
  className?: string;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const Alert = ({
  variant,
  title,
  description,
  className,
  type,
  setAlertMessage,
}: AlertProps) => {
  useEffect(() => {
    setTimeout(() => setAlertMessage(""), 5000);
  }, [description]);

  return (
    <div
      className={cn(
        "w-full flex justify-center items-center fixed bottom-20 left-0 z-50 transition-transform duration-10000 "
      )}
    >
      <CnAlert
        variant={variant}
        className={cn(className + " w-fit", {
          "bg-[#ffdddd]": type === "Error",
          "bg-[#fff4cc]": type === "Warning",
          "bg-[#ddffdd]": type === "Success",
        })}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </CnAlert>
    </div>
  );
};

export default Alert;
