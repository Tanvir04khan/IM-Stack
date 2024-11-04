import { NextFunction, Request, Response } from "express";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
  TagsType,
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

    const projectDocDetails = await database.query.Projects.findFirst({
      where: (Projects, { eq }) => eq(Projects.projectId, projectDocId),
      with: {
        Tags: {
          where: (Tags, { eq }) => eq(Tags.type, TagsType.PROJECT),
          columns: {},
          with: {
            Technologies: true,
          },
        },
      },
    });

    const createdBy = await database.query.Users.findFirst({
      where: (Users, { eq }) =>
        eq(Users.userId, projectDocDetails ? projectDocDetails.createdBy : ""),
      columns: {
        firstName: true,
        lastName: true,
        userId: true,
      },
    });

    const modifiedBy = await database.query.Users.findFirst({
      where: (Users, { eq }) =>
        eq(Users.userId, projectDocDetails ? projectDocDetails.modifiedBy : ""),
      columns: {
        firstName: true,
        lastName: true,
        userId: true,
      },
    });

    if (!projectDocDetails) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    let icon = projectDocDetails?.icon.toString("base64");
    icon = projectDocDetails?.iconType + "," + icon;

    return res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOC_DETAILS,
      data: { ...projectDocDetails, icon, createdBy, modifiedBy },
    });
  } catch (error) {
    next(error);
  }
};

export default getProjectDocDetails;
