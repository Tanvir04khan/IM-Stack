import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  Score,
  SuccesMessage,
  TagsTagType,
  TagsType,
} from "../../utils/enums";
import { database } from "../../database/connection";
import {
  Projects,
  Rewards,
  Tags,
  Users,
  UsersRoles,
} from "../../database/schema";
import { eq, sql } from "drizzle-orm";
import { Roles as uRoles } from "../../utils/enums";

const createProjectDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectName, summary, projectIcon, document, tags } = req.body;
  const { userId } = req.params;
  try {
    if (
      !projectName ||
      !summary ||
      !projectIcon ||
      !document ||
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

    const writeRole = await database.query.Roles.findFirst({
      where: (Roles, { inArray }) => inArray(Roles.role, [uRoles.WRITE]),
    });

    await database.insert(UsersRoles).values({
      roleId: writeRole ? writeRole.roleId : "",
      userId,
      projectId: result[0].projectId,
    });

    const tagsToBeAdded = [];

    for (const tag of tags) {
      tagsToBeAdded.push({
        tagType: TagsTagType.TECHNOLOGY,
        type: TagsType.PROJECT,
        projectId: result[0].projectId,
        technologyId: tag.id,
      });
    }

    await database.insert(Tags).values(tagsToBeAdded);

    if (!result.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    await database
      .update(Rewards)
      .set({
        score: sql`${Rewards.score} + ${Score.CREATE_PROJECT}`,
      })
      .where(eq(Rewards.userId, userId));

    return res.json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.PROJECT_DOCS_CREATE,
      data: { projectDocId: result[0].projectId },
    });
  } catch (error) {
    next(error);
  }
};

export default createProjectDoc;
