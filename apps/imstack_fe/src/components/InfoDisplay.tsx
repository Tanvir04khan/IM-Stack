import React, { ReactNode } from "react";

export type InfoDisplayPropsType = {
  lable: string;
  value: ReactNode;
};

const InfoDisplay = ({ lable, value }: InfoDisplayPropsType) => {
  return (
    <div className="flex flex-col items-left justify-center">
      <h6 className="text-sm text-muted-foreground">{lable}</h6>
      <h3 className="text-base font-semibold">{value}</h3>
    </div>
  );
};

export default InfoDisplay;
