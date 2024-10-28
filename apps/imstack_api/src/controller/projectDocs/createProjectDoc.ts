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
import { Projects, Users } from "../../database/schema";
import { eq } from "drizzle-orm";

const createProjectDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectName, summary, projectIcon, document } = req.body;
  const { userId } = req.params;
  try {
    if (!projectName || !summary || !projectIcon || !document || !userId) {
      throw new NodeError(
        ErrorMessage.PROJECT_POST_DETAILS,
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

    const projectIconArray = projectIcon.split(",");

    const icon = Buffer.from(projectIconArray[1], "base64");

    const result = await database
      .insert(Projects)
      .values({
        projectName,
        icon,
        iconType: projectIconArray[0],
        summary,
        document,
        createdBy: userId,
        modifiedBy: userId,
      })
      .returning();

    if (!result.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    return res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOCS_CREATE,
    });
  } catch (error) {
    next(error);
  }
};

export default createProjectDoc;
