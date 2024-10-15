import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TotalActivities } from "@/enum";
import { LucideProps } from "lucide-react";

type ActivityCardPropsType = {
  title: ReactNode;
  timeSpan?: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  content: ReactNode;
};

const ActivityCard = ({
  title,
  timeSpan,
  Icon,
  content,
}: ActivityCardPropsType) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{timeSpan}</p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
