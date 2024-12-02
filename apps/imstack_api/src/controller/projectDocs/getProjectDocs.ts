import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
  TagsType,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { Projects, Users } from "../../database/schema";
import { desc, eq } from "drizzle-orm";

const getProjectDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { limit } = req.query;

  try {
    if (!userId) {
      throw new NodeError(
        ErrorMessage.USERID,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database.query.Users.findFirst({
      where: (Users, { eq }) => eq(Users.userId, userId),
    });

    if (!user) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USER,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    const projects = await database.query.Projects.findMany({
      columns: {
        projectId: true,
        projectName: true,
        summary: true,
        icon: true,
        iconType: true,
        createdBy: true,
        createdOn: true,
        modifiedBy: true,
        modifiedOn: true,
      },
      with: {
        Tags: {
          where: (Tags, { eq }) => eq(Tags.type, TagsType.PROJECT),
          columns: {},
          with: {
            Technologies: true,
          },
        },
        Users: {
          columns: {
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
      },
      orderBy: [desc(Projects.modifiedOn)],
      limit: limit ? +limit : undefined,
    });

    if (!projects.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    const modifiedByUserIds = projects.map(({ modifiedBy }) => modifiedBy);

    const modifiedByUserDetails: {
      userName: string;
      userId: string | undefined;
    }[] = [];

    for (const modifiedByUserId of modifiedByUserIds) {
      const modifiedBy = await database.query.Users.findFirst({
        where: (Users, { eq }) => eq(Users.userId, modifiedByUserId),
        columns: {
          firstName: true,
          lastName: true,
          userId: true,
        },
      });

      modifiedByUserDetails.push({
        userName: `${modifiedBy?.firstName} ${modifiedBy?.lastName}`,
        userId: modifiedBy?.userId,
      });
    }
    console.log(modifiedByUserDetails);

    const data = projects.map((project, i) => ({
      ...project,
      icon: project.iconType + "," + project.icon.toString("base64"),
      createdBy: {
        userName: `${project.Users.firstName} ${project.Users.lastName}`,
        userId: project.Users.userId,
      },
      modifiedBy: modifiedByUserDetails[i],
    }));

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOCS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default getProjectDocs;
