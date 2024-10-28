import { Router, type RequestHandler } from "express";
import addQuestion from "../controller/question/addQuestion";
import getQuestions from "../controller/question/getQuestions";
import getQuestionDetails from "../controller/question/getQuestionDetails";
import updateQuestion from "../controller/question/updateQuestion";

const questionRouter = Router();

questionRouter.post("/add-question/:userId", addQuestion as RequestHandler);

questionRouter.get("/get-question", getQuestions as RequestHandler);

questionRouter.get(
  "/get-questiondetails",
  getQuestionDetails as RequestHandler
);

questionRouter.put("update-question", updateQuestion as RequestHandler);

export default questionRouter;
