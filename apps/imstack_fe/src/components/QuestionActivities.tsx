import React from "react";
import Activity from "./Activity";
import { Eye } from "lucide-react";

type QuestionActivitiesPropsType = {
  askedOn: string;
  ModifiedOn: string;
  views: number;
};

const QuestionActivities = ({
  askedOn,
  ModifiedOn,
  views,
}: QuestionActivitiesPropsType) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <div className="flex gap-2">
        <p>Asked</p>
        <p>{askedOn}</p>
      </div>
      <div className="flex gap-2">
        <p>Modified</p>
        <p>{ModifiedOn}</p>
      </div>
      <Activity Icon={Eye} name="Views" value={views} />
    </div>
  );
};

export default QuestionActivities;
