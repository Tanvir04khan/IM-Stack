import { Answers, Rewards, Users, Votes } from "./../../database/schema";
import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  Score,
  SuccesMessage,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { and, eq, sql } from "drizzle-orm";

const acceptAsBestAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { answerId, acceptAsBestAnswer } = req.body;
  try {
    if (!userId || !answerId) {
      throw new NodeError(
        ErrorMessage.ACCEPT_AS_BEST_ANSWER,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.userId, [userId]),
    });

    if (!user) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USER,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const result = await database
      .update(Answers)
      .set({
        acceptedAsBest: acceptAsBestAnswer,
      })
      .where(and(eq(Answers.answerId, answerId), eq(Answers.userId, userId)))
      .returning();

    if (!result.length) {
      throw new NodeError(
        ErrorMessage.ACCEPT_AS_BEST_ANSWER_USER,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_REQUEST
      );
    }

    await database
      .update(Rewards)
      .set({
        score: sql`${Rewards.score} + ${Score.ACCEPTED_AS_BEST_ANSWER}`,
      })
      .where(eq(Rewards.userId, result[0].userId));

    res.json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ADD_VOTE,
      data: { voteId: result[0].answerId },
    });
  } catch (error) {
    next(error);
  }
};

export default acceptAsBestAnswer;
