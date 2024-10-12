import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

export type ActivityPropsType = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  value: string | number;
};

const Activity = ({ Icon, value }: ActivityPropsType) => {
  return (
    <div className="grid grid-cols-2 items-center ">
      <Icon className="h-4 w-4" />
      <p>{value}</p>
    </div>
  );
};

export default Activity;
