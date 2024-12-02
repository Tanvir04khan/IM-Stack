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
  createdBy?: string;
  modifiedOn: string;
};

export type CommentsType = {
  commentId: string;
  comment: string;
  commentedOn: string;
  userId: string;
  type: string;
  questionId: string;
  answerId: string;
  User: RUsersType;
};

export type VotesType = {
  voteId: string;
  vote: number;
  type: string;
  answerId: string;
  questionId: string;
};

export type AnswerType = {
  answerId: string;
  answer: string;
  answeredOn: string;
  userId: string;
  questionId: string;
  acceptedAsBest: boolean;
  Comments: { commentId: string }[];
  Votes: VotesType[];
  Users: RUsersType;
};

export type TechnologiesType = {
  technologyId: string;
  technology: string;
};

export type ProjectTagsType = {
  projectId: string;
  projectName: string;
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
  UsersRoles: {
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
  views: number;
  userId: string;
  askedOn: string;
  Answers: { count: number; hasAcceptedBestAnswer: boolean };
  Tags: {
    techTags: { technologyId: string; technology: string }[];
    projectTags: { projectId: string; projectName: string }[];
  };
  Users: {
    firstName: string;
    lastName: string;
    userId: string;
    image: string;
    imageType: string;
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

export type RUsersType = {
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  image: string;
  clerkUserID: string;
  imageType: string;
  joinedOn: string;
};

export type RQuestionDetails = {
  questionId: string;
  title: string;
  question: string;
  views: number;
  askedOn: string;
  modifiedOn: string;
  userId: string;
  Users: RUsersType;
  Answers: AnswerType[];
  Tags: {
    techTags: { technologyId: string; technology: string }[];
    projectTags: { projectId: string; projectName: string }[];
  };
  Comments: { commentId: string }[];
  Votes: VotesType[];
};

export type RUserDetails = {
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  image: string;
  clerkUserID: string;
  imageType: string;
  joinedOn: string;
  Rewards: {
    score: number;
  };
  UserTechnologies: {
    userTechId: string;
    Technologies: { technologyId: string; technology: string };
  }[];
  UsersRoles: {
    userRoleId: string;
    Roles: {
      roleId: string;
      role: string;
    };
    Projects: {
      projectId: string;
      projectName: string;
      createdBy: string;
      createdOn: string;
      icon: string;
      iconType: string;
    };
  }[];
};

export type RCommentsType = {
  commentId: string;
  comment: string;
  commentedOn: string;
  userId: string;
  type: string;
  questionId: string;
  answerId: string;
  User: {
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
    imageType: string;
  };
};

export type RLeaderBoardType = {
  score: number;
  Users: {
    firstName: string;
    lastName: string;
    image: string;
    imageType: string;
    userId: string;
  };
};
