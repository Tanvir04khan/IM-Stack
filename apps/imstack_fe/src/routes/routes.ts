import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./Root";
import Auth from "@/screens/Auth";
import Home from "@/screens/Home";
import ProjectDocs from "@/screens/ProjectDocs";
import ProjectDocsDetail from "@/screens/ProjectDocsDetail";
import CreateProjects from "@/screens/CreateProjects";
import Questions from "@/screens/Questions";
import QuestionDetails from "@/screens/QuestionDetails";
import AskQuestion from "@/screens/AskQuestion";
import ManageUsers from "@/screens/ManageUsers";
import UserDetails from "@/screens/UserDetails";
import Profile from "@/screens/Profile";

export const rootRoute = createRootRoute({
  component: Root,
});

export const routesWithCpmponent = [
  {
    getParentRoute: () => rootRoute,
    path: "/",
    component: Auth,
  },
  {
    name: "Home",
    getParentRoute: () => rootRoute,
    path: "/home",
    component: Home,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/projectdocs",
    component: ProjectDocs,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/projectdocs/$projectdocsId",
    component: ProjectDocsDetail,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/projectdocs/createprojects",
    component: CreateProjects,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/profile/$userId",
    component: Profile,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/questions",
    component: Questions,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/questions/$questionId",
    component: QuestionDetails,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/askquestions",
    component: AskQuestion,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/manageusers",
    component: ManageUsers,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/manageusers/$userId",
    component: UserDetails,
  },
];

let routes = routesWithCpmponent.map((route) => createRoute(route));

const routeTree = rootRoute.addChildren(routes);
export const router = createRouter({ routeTree });
