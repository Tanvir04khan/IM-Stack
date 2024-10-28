import { NextFunction, Request, Response } from "express";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";
import NodeError from "../../utils/NodeError";
import { database } from "../../database/connection";
import { Projects } from "../../database/schema";
import { eq } from "drizzle-orm";

const getProjectDocDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectDocId } = req.params;
  try {
    if (!projectDocId) {
      throw new NodeError(
        ErrorMessage.PROJECT_DETAILS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const projectDocDetails = await database
      .select()
      .from(Projects)
      .where(eq(Projects.projectId, projectDocId));

    let icon = projectDocDetails[0].icon.toString("base64");
    icon = projectDocDetails[0].iconType + "," + icon;

    return res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOC_DETAILS,
      data: { ...projectDocDetails[0], icon },
    });
  } catch (error) {
    next(error);
  }
};

export default getProjectDocDetails;
