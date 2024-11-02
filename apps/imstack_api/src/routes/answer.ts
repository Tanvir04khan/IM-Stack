import { Router, type RequestHandler } from "express";
import addAnswer from "../controller/answer/addAnswer";
import updateAnswer from "../controller/answer/updateAnswer";

const answerRouter = Router();

answerRouter.post("/add-answer/:userId", addAnswer as RequestHandler);

answerRouter.put("/update-answer/:userId", updateAnswer as RequestHandler);

export default answerRouter;
