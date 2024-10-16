import React, { ReactNode } from "react";
import {
  Dialog as SCNDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type DialogPropstype = {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Dialog = ({
  children,
  title,
  description,
  content,
  action,
  isOpen,
  setIsOpen,
}: DialogPropstype) => {
  return (
    <SCNDialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl max-h-full h-auto overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{action}</DialogFooter>
      </DialogContent>
    </SCNDialog>
  );
};

export default Dialog;
