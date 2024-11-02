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
import { Comments } from "../../database/schema";
import { eq } from "drizzle-orm";

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { commentId } = req.body;
  try {
    if (!userId || !commentId) {
      throw new NodeError(
        ErrorMessage.DELETE_COMMENT,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const commId = await database
      .delete(Comments)
      .where(eq(Comments.commentId, commentId))
      .returning({ commentId: Comments.commentId });

    if (!commId.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.DELETE_COMMENT,
      data: { commentId: commId[0].commentId },
    });
  } catch (error) {
    next(error);
  }
};

export default deleteComment;
