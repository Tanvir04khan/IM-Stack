import { Router, type RequestHandler } from "express";
import addComment from "../controller/comment/addComment";
import deleteComment from "../controller/comment/deleteComment";
import getComment from "../controller/comment/getComments";

const commentRouter = Router();

commentRouter.get("/get-comments", getComment as RequestHandler);

commentRouter.post("/add-comment/:userId", addComment as RequestHandler);

commentRouter.delete(
  "/delete-comment/:userId",
  deleteComment as RequestHandler
);

export default commentRouter;
