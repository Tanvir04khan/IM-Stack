import React, { ReactNode } from "react";

export type InfoDisplayPropsType = {
  lable: string;
  value: ReactNode;
  lableClassName?: string;
  valueClassName?: string;
};

const InfoDisplay = ({
  lable,
  value,
  lableClassName = "text-sm text-muted-foreground",
  valueClassName = "text-base font-semibold",
}: InfoDisplayPropsType) => {
  return (
    <div className="flex flex-col items-left justify-center">
      <h6 className={lableClassName}>{lable}</h6>
      <h3 className={valueClassName}>{value}</h3>
    </div>
  );
};

export default InfoDisplay;
