import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
  TagsTagType,
  TagsType,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { Projects, Tags, Technologies, Users } from "../../database/schema";
import { and, eq } from "drizzle-orm";

const getProjectDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new NodeError(
        ErrorMessage.USERID,
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

    const projects = await database
      .select({
        projectId: Projects.projectId,
        projectName: Projects.projectName,
        summary: Projects.summary,
        icon: Projects.icon,
        iconType: Projects.iconType,
      })
      .from(Projects);

    if (!projects.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    const projectsData: projects[] = [];

    for (const project of projects) {
      let icon = project.icon.toString("base64");
      icon = project.iconType + "," + icon;
      const projectData: projects = { ...project, icon, tags: [] };
      const projectTags = await database
        .select()
        .from(Tags)
        .where(
          and(
            eq(Tags.type, TagsType.PROJECT),
            eq(Tags.tagType, TagsTagType.TECHNOLOGY),
            eq(Tags.projectId, project.projectId)
          )
        )
        .leftJoin(
          Technologies,
          eq(Tags.technologyId, Technologies.technologyId)
        );

      const tags = projectTags.map((tag) => ({
        technologyId: tag.Technologies?.technologyId || "",
        technology: tag.Technologies?.technology || "",
      }));

      projectData.tags = tags;

      projectsData.push(projectData);
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOCS,
      data: projectsData,
    });
  } catch (error) {
    next(error);
  }
};

export default getProjectDocs;
