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
  onClick?: () => void;
} & {
  [key in any]: ReactNode;
};

export type ProjectsRowstype = {
  isSelected?: boolean;
  projectId: string;
  onClick?: () => void;
} & {
  [key in ProductsColumn]: ReactNode;
};

export type QuestionsRowsType = {
  isSelected?: boolean;
  onClick?: () => void;
} & {
  [key in QuestionsColumn]: ReactNode;
};

export type UsersRowsType = {
  isSelected?: boolean;
  onClick?: (item: UsersRowsType) => void;
  userId: string;
} & {
  [key in UsersColumn]: ReactNode;
};

export type AvatarWithTooltip = {
  name: string;
  avatar: ReactNode;
};

export type ProjectsType = {
  icon: string;
  projectName: string;
  projectId: string;
  summary: string;
  technologies: { technologyId: string; technology: string }[];
};

export type ResponseType<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export type RUserType = {
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  image: string | null;
  clerkUserID: string;
  UserRoles: {
    Roles: { roleId: string; role: string };
    Projects: { projectId: string; projectName: string } | null;
  }[];
};

export type RActivitiesType = {
  totalProjects: number;
  totalQuestions: number;
  totalAnswers: number;
  totalVotes: number;
};

export type RProjectDocsType = {
  projectId: string;
  projectName: string;
  summary: string;
  icon: string;
  createdBy: { userName: string; userId: string };
  createdOn: string;
  modifiedBy: { userName: string; userId: string };
  modifiedOn: string;
  Tags: { Technologies: { technologyId: string; technology: string } }[];
}[];

export type RQuestionsType = {
  questionId: string;
  title: string;
  question: string;
  views: number;
  askedOn: string;
  userId: string;
  Answers: { count: number; hasAcceptedBestAnswer: boolean };
  Tags: {
    techTags: { technologyId: string; technology: string }[];
    projectTags: { projectId: string; projectName: string }[];
  };
  Users: {
    firstName: string;
    lastName: string;
    userId: string;
  };
  Votes: number;
}[];

export type RProjectDocDetailsType = {
  projectId: string;
  projectName: string;
  createdBy: {
    firstName: string;
    lastName: string;
    userId: string;
  };
  createdOn: string;
  modifiedBy: {
    firstName: string;
    lastName: string;
    userId: string;
  };
  modifiedOn: string;
  summary: string;
  document: string;
  icon: string;
  Tags: { Technologies: { technologyId: string; technology: string } }[];
};
