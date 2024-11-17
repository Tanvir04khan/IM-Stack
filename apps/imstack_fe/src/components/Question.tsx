import React, { ReactNode } from "react";

type QuestionPropsType = {
  title: string;
  description?: ReactNode;
};

const Question = ({ title, description }: QuestionPropsType) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground w-[30ch] ">{description}</p>
      )}
    </div>
  );
};

export default Question;
