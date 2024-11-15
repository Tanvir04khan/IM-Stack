import { NextFunction, Request, Response } from "express";
import { database } from "../../database/connection";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
  Roles as URoles,
} from "../../utils/enums";
import NodeError from "../../utils/NodeError";

const getProjectTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await database.query.Projects.findMany({
      columns: {
        projectId: true,
        projectName: true,
      },
    });

    if (!projects.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_PROJECTTAGS,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export default getProjectTags;
