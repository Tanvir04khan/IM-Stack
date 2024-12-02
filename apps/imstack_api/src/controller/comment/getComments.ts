import { NextFunction, Request, Response } from "express";
import {
  APIStatusCode,
  CommentType,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";
import NodeError from "../../utils/NodeError";
import { database } from "../../database/connection";
import { Comments } from "../../database/schema";

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const { questionId, answerId }: { questionId?: string; answerId?: string } =
    req.query;

  const commentType =
    questionId && answerId
      ? ""
      : questionId
        ? CommentType.QUESTION
        : answerId
          ? CommentType.ANSWER
          : "";
  try {
    if (!commentType) {
      throw new NodeError(
        ErrorMessage.ADD_COMMENTS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const comments = await database.query.Comments.findMany({
      where: (Comments, { and, eq }) =>
        and(
          eq(Comments.type, commentType),
          commentType === CommentType.QUESTION
            ? eq(Comments.questionId, questionId ? questionId : "")
            : eq(Comments.answerId, answerId ? answerId : "")
        ),
      with: {
        User: {
          columns: {
            userId: true,
            firstName: true,
            lastName: true,
            image: true,
            imageType: true,
          },
        },
      },
    });

    res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_COMMENTS,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export default getComment;
