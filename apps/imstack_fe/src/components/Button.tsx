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
};

const Button = ({
  content,
  children,
  onClick,
  variant = "default",
}: ButtonPropsType) => {
  return (
    <SCNButton variant={variant} onClick={(e) => onClick(e)}>
      <div className="flex flex-row gap-1 items-center">
        <p>{content}</p>
        {children}
      </div>
    </SCNButton>
  );
};

export default Button;
