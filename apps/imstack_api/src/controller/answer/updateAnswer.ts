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
import { Answers } from "../../database/schema";
import { eq } from "drizzle-orm";

const updateAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { answer, answerId } = req.body;
  try {
    if (!userId || !answer || !answerId) {
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

    const answerDb = database.query.Answers.findFirst({
      where: (Answers, { inArray }) => inArray(Answers.answerId, [answerId]),
    });

    if (!answerDb) {
      throw new NodeError(
        ErrorMessage.ANSWER_UPDATE,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const ansId = await database
      .update(Answers)
      .set({
        answer,
      })
      .where(eq(Answers.answerId, answerId))
      .returning({ answerId: Answers.answerId });

    if (!ansId.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.UPDATE_ANSWER,
      data: { answerId: ansId[0].answerId },
    });
  } catch (error) {
    next(error);
  }
};

export default updateAnswer;
