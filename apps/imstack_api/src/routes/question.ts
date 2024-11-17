import { Router, type RequestHandler } from "express";
import addQuestion from "../controller/question/addQuestion";
import getQuestions from "../controller/question/getQuestions";
import getQuestionDetails from "../controller/question/getQuestionDetails";
import updateQuestion from "../controller/question/updateQuestion";
import updateViews from "../controller/question/updateViews";

const questionRouter = Router();

questionRouter.post("/add-question/:userId", addQuestion as RequestHandler);

questionRouter.get("/get-questions/:userId", getQuestions as RequestHandler);

questionRouter.get(
  "/get-questiondetails/:questionId",
  getQuestionDetails as RequestHandler
);

questionRouter.put(
  "/update-question/:userId",
  updateQuestion as RequestHandler
);

questionRouter.put("/update-views/:userId", updateViews as RequestHandler);

export default questionRouter;
