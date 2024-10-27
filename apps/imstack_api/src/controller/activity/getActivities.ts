import { Answers, Votes } from "./../../database/schema";
import { log } from "console";
import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { getUserQuery } from "../../utils/queries";
import { Projects, Questions, Users } from "../../database/schema";
import { count, eq } from "drizzle-orm";

const getActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USERID,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database
      .select()
      .from(Users)
      .where(eq(Users.userId, userId))
      .limit(1);

    if (!user.length) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USER,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const projects = await database
      .select({ count: count() })
      .from(Projects)
      .where(eq(Projects.createdBy, userId));

    const questions = await database
      .select({ count: count() })
      .from(Questions)
      .where(eq(userId, Questions.userId));

    const votes = await database
      .select({ count: count() })
      .from(Votes)
      .where(eq(userId, Votes.userId));

    const answers = await database
      .select({ count: count() })
      .from(Answers)
      .where(eq(userId, Answers.userId));

    return res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ACTIVITIES,
      data: {
        totalProjects: projects[0].count,
        totalQuestions: questions[0].count,
        totalAnswers: answers[0].count,
        totalVotes: votes[0].count,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getActivities;
