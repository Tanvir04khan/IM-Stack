import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TotalActivities } from "@/enum";
import { LucideProps } from "lucide-react";

type ActivityCardPropsType = {
  title: TotalActivities;
  timeSpan: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  activityCount: number;
};

const ActivityCard = ({
  title,
  timeSpan,
  Icon,
  activityCount,
}: ActivityCardPropsType) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activityCount}</div>
        <p className="text-xs text-muted-foreground">{timeSpan}</p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
