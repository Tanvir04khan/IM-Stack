import {
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from "react";
import {
  ProductsColumn,
  QuestionsColumn,
  TotalActivities,
  UsersColumn,
} from "./enum";
import { LucideProps } from "lucide-react";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export type NavItemsType = { item: string; path: string };

export type TotalActivitiesType = {
  title: TotalActivities;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  timeSpan: string;
};

export type TableColumnsType = {
  field: ProductsColumn | QuestionsColumn | UsersColumn;
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

export type UsersRowsType = {
  isSelected?: boolean;
} & {
  [key in UsersColumn]: ReactNode;
};

export type AvatarWithTooltip = {
  name: string;
  avatar: ReactNode;
};
