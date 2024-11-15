import { Paths, TotalActivities } from "./enum";
import {
  FileQuestion,
  FolderSync,
  PanelsTopLeft,
  Vote,
  Eye,
} from "lucide-react";
import {
  NavItemsType,
  ProjectTagsType,
  ResponseType,
  RQuestionsType,
  RUserType,
  TechnologiesType,
  TotalActivitiesType,
} from "./type";
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
    name: "Views",
    Icon: Eye,
    value: 0,
  },
  {
    name: "Answers",
    Icon: FolderSync,
    value: 0,
  },
  {
    name: "Votes",
    Icon: Vote,
    value: 0,
  },
];

const baseURL = import.meta.env.VITE_API_ENDPOINT;

export const customFetch = async (
  path: string | URL | globalThis.Request,
  body?: any,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) => {
  const response = await fetch(`${baseURL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

//
export async function getQuestions(
  userId: string,
  limit?: number
): Promise<ResponseType<RQuestionsType>> {
  const data = await customFetch(
    `${Paths.GET_QUESTIONS}/${userId}${limit ? `?limit=${limit}` : ""}`
  );
  return data;
}

export async function getUser(
  clerkUserId: string
): Promise<ResponseType<RUserType>> {
  const data = await customFetch(`${Paths.GET_USER}/${clerkUserId}`);
  return data;
}

export async function getTechnologies(): Promise<
  ResponseType<TechnologiesType[]>
> {
  const data = await customFetch(`${Paths.GET_TECHNOLOGIES}`);
  return data;
}

export async function getProjectTags(): Promise<
  ResponseType<ProjectTagsType[]>
> {
  const data = await customFetch(`${Paths.GET_PROJECT_TAGS}`);
  return data;
}
