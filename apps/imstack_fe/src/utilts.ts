import { TotalActivities } from "./enum";
import {
  FileQuestion,
  FolderSync,
  PanelsTopLeft,
  Vote,
  Eye,
} from "lucide-react";
import { NavItemsType, TotalActivitiesType } from "./type";
import { ActivityPropsType } from "./components/Activity";

export const navItems: NavItemsType[] = [
  {
    item: "Home",
    path: "/home",
  },
  {
    item: "Project Docs",
    path: "/projectdocs",
  },
  {
    item: "Questions",
    path: "/questions",
  },
  {
    item: "Ask Questions",
    path: "/askquestions",
  },
  {
    item: "Manage Users",
    path: "/manageusers",
  },
];

export const totalActivities: TotalActivitiesType[] = [
  {
    title: TotalActivities.TOTALPROJECTS,
    Icon: PanelsTopLeft,
    timeSpan: "from last 3 month",
  },
  {
    title: TotalActivities.TOTALQUESTIONS,
    Icon: FileQuestion,
    timeSpan: "from last 3 month",
  },
  {
    title: TotalActivities.TOTALANSWERS,
    Icon: FolderSync,
    timeSpan: "from last 3 month",
  },
  {
    title: TotalActivities.TOTALVOTES,
    Icon: Vote,
    timeSpan: "from last 3 month",
  },
];

export const questionActivities: ActivityPropsType[] = [
  {
    Icon: Eye,
    value: 600,
  },
  {
    Icon: FolderSync,
    value: 10,
  },
  {
    Icon: Vote,
    value: 200,
  },
];