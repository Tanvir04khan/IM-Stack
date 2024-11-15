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
import { Projects, Tags, Users } from "../../database/schema";
import { eq } from "drizzle-orm";

const updateProjectDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId, projectName, summary, projectIcon, document, tags } =
    req.body;
  const { userId } = req.params;

  try {
    if (
      !projectName ||
      !summary ||
      !projectIcon ||
      !document ||
      !projectId ||
      !userId ||
      !tags ||
      !tags.length
    ) {
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
      .update(Projects)
      .set({
        projectName,
        icon,
        summary,
        document,
        modifiedBy: userId,
      })
      .where(eq(Projects.projectId, projectId))
      .returning();

    if (!result.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    const tagsToBeAdded = [];

    for (const tag of tags) {
      const t = await database.query.Tags.findFirst({
        where: (Tags, { eq, and }) =>
          and(
            eq(Tags.type, TagsType.PROJECT),
            eq(Tags.tagType, TagsTagType.TECHNOLOGY),
            eq(Tags.projectId, projectId),
            eq(Tags.technologyId, tag.id)
          ),
      });

      if (t?.tagId) {
        continue;
      }

      tagsToBeAdded.push({
        tagType: TagsTagType.TECHNOLOGY,
        type: TagsType.PROJECT,
        projectId: result[0].projectId,
        technologyId: tag.id,
      });
    }

    if (tagsToBeAdded.length) {
      await database.insert(Tags).values(tagsToBeAdded);
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOC_DETAILS_UPDATE,
      data: { projectId: result[0].projectId },
    });
  } catch (error) {
    next(error);
  }
};

export default updateProjectDoc;
