import { LucideProps } from "lucide-react";
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import Tooltip from "./Tooltip";

export type ActivityPropsType = {
  name: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  value: string | number;
};

const Activity = forwardRef(({ Icon, value, name }: ActivityPropsType) => {
  return (
    <div className="grid grid-cols-2 items-center cursor-pointer ">
      <Tooltip content={name}>
        <Icon className="h-4 w-4" />
      </Tooltip>
      <p>{value}</p>
    </div>
  );
});

export default Activity;
