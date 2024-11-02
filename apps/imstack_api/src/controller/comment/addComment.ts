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

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { comment, questionId, answerId } = req.body;
  const commentType =
    questionId && answerId
      ? ""
      : questionId
        ? CommentType.QUESTION
        : answerId
          ? CommentType.ANSWER
          : "";
  try {
    if (!userId || !commentType) {
      throw new NodeError(
        ErrorMessage.ADD_COMMENTS,
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

    const commentId = await database
      .insert(Comments)
      .values({
        comment,
        type: commentType,
        userId,
        answerId: commentType === CommentType.ANSWER ? answerId : null,
        questionId: commentType === CommentType.QUESTION ? questionId : null,
      })
      .returning({ commentId: Comments.commentId });

    if (!commentId.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ADD_COMMENT,
      data: { commentId: commentId[0].commentId },
    });
  } catch (error) {
    next(error);
  }
};

export default addComment;
