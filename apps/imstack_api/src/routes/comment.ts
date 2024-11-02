import { Router, type RequestHandler } from "express";
import addComment from "../controller/comment/addComment";
import deleteComment from "../controller/comment/deleteComment";

const commentRouter = Router();

commentRouter.post("/add-comment/:userId", addComment as RequestHandler);

commentRouter.delete(
  "/delete-comment/:userId",
  deleteComment as RequestHandler
);

export default commentRouter;
