import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./Root";
import Auth from "@/screens/Auth";
import Home from "@/screens/Home";
import ProjectDocs from "@/screens/ProjectDocs";

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
    children: [
      {
        path: "/test",
        component: Home,
      },
    ],
  },
  {
    getParentRoute: () => rootRoute,
    path: "/questions",
    component: Home,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/askquestions",
    component: Home,
  },
  {
    getParentRoute: () => rootRoute,
    path: "/manageusers",
    component: Home,
  },
];

let routes = routesWithCpmponent.map((route) => createRoute(route));

const routeTree = rootRoute.addChildren(routes);
export const router = createRouter({ routeTree });
