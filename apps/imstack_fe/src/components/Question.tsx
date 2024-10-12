import React from "react";

type QuestionPropsType = {
  title: string;
  description: string;
};

const Question = ({ title, description }: QuestionPropsType) => {
  return (
    <div className="grid grid-rows-2 gap-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground w-[30ch] truncate">
        {description}
      </p>
    </div>
  );
};

export default Question;
