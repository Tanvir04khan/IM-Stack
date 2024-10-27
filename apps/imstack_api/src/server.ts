import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import { type Server, createServer as httpServer } from "node:http";
import morgan from "morgan";
import cors from "cors";
import answerRouter from "./routes/answer";
import commentRouter from "./routes/comment";
import projectDocsRouter from "./routes/projectDocs";
import questionRouter from "./routes/question";
import userRouter from "./routes/user";
import voteRoter from "./routes/vote";
import errorHandler from "./controller/errorHandler";
import activityRoter from "./routes/activity";

export const createServer = (): Server => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  //Activity
  app.use(activityRoter);

  //Answer
  app.use(answerRouter);

  //Comment
  app.use(commentRouter);

  //ProjectDoc
  app.use(projectDocsRouter);

  //Question
  app.use(questionRouter);

  //User
  app.use(userRouter);

  //Vote
  app.use(voteRoter);

  //Error handler
  app.use(errorHandler);

  return httpServer(app);
};
