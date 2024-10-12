import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { ProductsColumn, QuestionsColumn, TotalActivities } from "./enum";
import { LucideProps } from "lucide-react";

export type NavItemsType = { item: string; path: string };

export type TotalActivitiesType = {
  title: TotalActivities;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  timeSpan: string;
};

export type TableColumnsType = {
  field: ProductsColumn | QuestionsColumn;
  title: string;
  textAlignment: "right" | "left" | "center";
};

export type TableRowsType = {
  [key in any]: ReactNode;
};

export type ProjectsRowstype = {
  isSelected?: boolean;
} & {
  [key in ProductsColumn]: ReactNode;
};

export type QuestionsRowsType = {
  isSelected?: boolean;
} & {
  [key in QuestionsColumn]: ReactNode;
};
