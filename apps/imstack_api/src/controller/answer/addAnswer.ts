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
import { Answers, Rewards } from "../../database/schema";
import { database } from "../../database/connection";
import { eq, sql } from "drizzle-orm";

const addAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { answer, questionId } = req.body;
  try {
    if (!userId || !answer || !questionId) {
      throw new NodeError(
        ErrorMessage.ANSWER_POST_DETAILS,
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

    const question = database.query.Questions.findFirst({
      where: (Questions, { inArray }) =>
        inArray(Questions.questionId, [questionId]),
    });

    if (!question) {
      throw new NodeError(
        ErrorMessage.ANSWER_QUESTION,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const answerId = await database
      .insert(Answers)
      .values({
        answer,
        questionId,
        userId,
        acceptedAsBest: false,
      })
      .returning({ answerId: Answers.answerId });

    if (!answerId.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    await database
      .update(Rewards)
      .set({
        score: sql`${Rewards.score} + ${Score.ADD_ANSWER}`,
      })
      .where(eq(Rewards.userId, userId));

    res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.POST_ANSWER,
      data: { questionId, answerId: answerId[0].answerId },
    });
  } catch (error) {
    next(error);
  }
};

export default addAnswer;
