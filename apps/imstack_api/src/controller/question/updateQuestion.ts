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
import { Questions } from "../../database/schema";
import { and, eq } from "drizzle-orm";

const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question, questionId } = req.body;
  const { userId } = req.params;
  try {
    if (!question || !questionId || !userId) {
      throw new NodeError(
        ErrorMessage.QUESTION_UPDATE_DETAILS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const questionDb = await database
      .select()
      .from(Questions)
      .where(
        and(eq(Questions.questionId, questionId), eq(Questions.userId, userId))
      )
      .limit(1);

    if (!questionDb.length) {
      throw new NodeError(
        ErrorMessage.QUESTION_UPDATE_CHECK,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const questionInsertResult = await database
      .update(Questions)
      .set({
        question,
      })
      .where(eq(Questions.questionId, questionId))
      .returning();

    if (!questionInsertResult.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.UPDATE_QUESTION,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export default updateQuestion;
