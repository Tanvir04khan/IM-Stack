import { Router, type RequestHandler } from "express";
import createProjectDoc from "../controller/projectDocs/createProjectDoc";
import updateProjectDoc from "../controller/projectDocs/updateProjectDoc";
import getProjectDocs from "../controller/projectDocs/getProjectDocs";
import getProjectDocDetails from "../controller/projectDocs/getProjectDocDetails";

const projectDocsRouter = Router();

projectDocsRouter.post(
  "/create-projectdoc",
  createProjectDoc as RequestHandler
);

projectDocsRouter.put("/get-projectdocs", getProjectDocs as RequestHandler);

projectDocsRouter.put(
  "/get-projectdocdetails",
  getProjectDocDetails as RequestHandler
);

projectDocsRouter.put(
  "/update-projectdocs",
  updateProjectDoc as RequestHandler
);

export default projectDocsRouter;
