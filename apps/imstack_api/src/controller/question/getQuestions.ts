import { Answers, Tags, Technologies } from "./../../database/schema";
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
import { Users } from "../../database/schema";
import { eq } from "drizzle-orm";

const getQuestions = async (
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
    console.log(userId, "from get questions..");

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

    const questions = await database.query.Questions.findMany({
      with: {
        Answers: true,
        Tags: {
          where: (Tags, { and, eq }) => and(eq(Tags.type, TagsType.QUESTION)),
          with: {
            Technologies: true,
            Projects: true,
          },
        },
      },
    });

    if (!questions.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    console.log(questions[0].Tags);

    const data = questions.map((data) => ({
      ...data,
      Answers: {
        count: data.Answers.length,
        hasAcceptedBestAnswer: data.Answers.some(
          ({ acceptedAsBest }) => acceptedAsBest
        ),
      },
      Tags: {
        techTags: data.Tags?.filter((tag) => tag.Technologies)?.map(
          ({ Technologies }) => ({
            technologyId: Technologies?.technologyId,
            technology: Technologies?.technology,
          })
        ),
        projectTags: data.Tags?.filter((tag) => tag.Projects)?.map(
          ({ Projects }) => ({
            projectId: Projects?.projectId,
            ProjectsName: Projects?.projectName,
          })
        ),
      },
    }));

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_QUESTIONS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default getQuestions;
