import { Router, type RequestHandler } from "express";
import createProjectDoc from "../controller/projectDocs/createProjectDoc";
import updateProjectDoc from "../controller/projectDocs/updateProjectDoc";
import getProjectDocs from "../controller/projectDocs/getProjectDocs";
import getProjectDocDetails from "../controller/projectDocs/getProjectDocDetails";
import getProjectTags from "../controller/projectDocs/getProjectTags";

const projectDocsRouter = Router();

projectDocsRouter.post(
  "/create-projectdoc/:userId",
  createProjectDoc as RequestHandler
);

projectDocsRouter.get(
  "/get-projectdocs/:userId",
  getProjectDocs as RequestHandler
);

projectDocsRouter.get(
  "/get-projectdocdetails/:projectDocId",
  getProjectDocDetails as RequestHandler
);

projectDocsRouter.put(
  "/update-projectdoc/:userId",
  updateProjectDoc as RequestHandler
);

projectDocsRouter.get("/get-projecttags", getProjectTags as RequestHandler);

export default projectDocsRouter;
