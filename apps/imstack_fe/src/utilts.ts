import { ForwardRefExoticComponent, RefAttributes } from "react";
import { totalActivitiesEnum } from "./enum";
import {
  FileQuestion,
  FolderSync,
  LucideProps,
  PanelsTopLeft,
  Vote,
} from "lucide-react";

export const navItems: { item: string; path: string }[] = [
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

export const totalActivities: {
  title: totalActivitiesEnum;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  timeSpan: string;
}[] = [
  {
    title: totalActivitiesEnum.totalProjects,
    Icon: PanelsTopLeft,
    timeSpan: "from last 3 month",
  },
  {
    title: totalActivitiesEnum.totalQuestions,
    Icon: FileQuestion,
    timeSpan: "from last 3 month",
  },
  {
    title: totalActivitiesEnum.totalAnswers,
    Icon: FolderSync,
    timeSpan: "from last 3 month",
  },
  {
    title: totalActivitiesEnum.totalVotes,
    Icon: Vote,
    timeSpan: "from last 3 month",
  },
];
