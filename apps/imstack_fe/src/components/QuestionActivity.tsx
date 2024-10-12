import React from "react";
import Activity, { ActivityPropsType } from "./Activity";

type QuestionActivityPropsType = {
  questionActivities: ActivityPropsType[];
};

const QuestionActivity = ({
  questionActivities,
}: QuestionActivityPropsType) => {
  return (
    <div className="flex flex-col ">
      {questionActivities.map((item) => (
        <Activity {...item} />
      ))}
    </div>
  );
};

export default QuestionActivity;
