import React, { ReactNode, SyntheticEvent } from "react";
import { Button as SCNButton } from "./ui/button";

type ButtonPropsType = {
  content?: ReactNode;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onClick: (e: SyntheticEvent) => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({
  content,
  children,
  onClick,
  variant = "default",
  type,
}: ButtonPropsType) => {
  return (
    <SCNButton variant={variant} type={type} onClick={(e) => onClick(e)}>
      <div className="flex flex-row gap-1 items-center">
        <p>{content}</p>
        {children}
      </div>
    </SCNButton>
  );
};

export default Button;
