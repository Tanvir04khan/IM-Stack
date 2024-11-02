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
import { Questions, Rewards, Tags, Users } from "../../database/schema";
import { eq, sql } from "drizzle-orm";

const addQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const { title, technologyTags, projectTags, question } = req.body;
  const { userId } = req.params;
  try {
    if (!title || !question || !userId) {
      throw new NodeError(
        ErrorMessage.QUESTION_ADD_DETAILS,
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

    const questionInsertResult = await database
      .insert(Questions)
      .values({
        question,
        title,
        userId,
        views: 0,
      })
      .returning();

    if (!questionInsertResult.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    await database
      .update(Rewards)
      .set({
        score: sql`${Rewards.score} + ${Score.ADD_QUESTION}`,
      })
      .where(eq(Rewards.userId, userId));

    const questionId = questionInsertResult[0].questionId;

    for (const techTag of technologyTags) {
      await database.insert(Tags).values({
        type: TagsType.QUESTION,
        tagType: TagsTagType.TECHNOLOGY,
        questionId,
        technologyId: techTag.technologyId,
      });
    }
    for (const projectTag of projectTags) {
      await database.insert(Tags).values({
        type: TagsType.QUESTION,
        tagType: TagsTagType.PROJECT,
        questionId,
        projectId: projectTag.projectId,
      });
    }

    res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ADD_QUESTION,
      data: { questionId },
    });
  } catch (error) {
    next(error);
  }
};

export default addQuestion;
