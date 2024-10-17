import React from "react";
import Activity, { ActivityPropsType } from "./Activity";

type QuestionActivityPropsType = {
  questionActivities: ActivityPropsType[];
  className?: string;
};

const QuestionActivity = ({
  questionActivities,
  className,
}: QuestionActivityPropsType) => {
  return (
    <div className={className || "flex flex-col max-w-16"}>
      {questionActivities.map((item) => (
        <Activity key={item.name} {...item} />
      ))}
    </div>
  );
};

export default QuestionActivity;
