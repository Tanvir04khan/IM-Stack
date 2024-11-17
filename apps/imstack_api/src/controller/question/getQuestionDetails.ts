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
import { Questions } from "../../database/schema";

const getQuestionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;
  console.log(questionId, "get question details...");
  try {
    if (!questionId) {
      throw new NodeError(
        ErrorMessage.GET_QUESTION_DETAILS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const questionDetails = await database.query.Questions.findFirst({
      where: (Questions, { inArray }) =>
        inArray(Questions.questionId, [questionId]),
      with: {
        Users: true,
        Answers: {
          with: {
            Comments: {
              with: {
                User: true,
              },
            },
            Votes: true,
            Users: true,
          },
        },
        Tags: {
          where: (Tags, { and, eq }) => and(eq(Tags.type, TagsType.QUESTION)),
          with: {
            Technologies: true,
            Projects: true,
          },
        },
        Comments: {
          with: {
            User: true,
          },
        },
        Votes: true,
      },
    });

    if (!questionDetails) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    const data = {
      ...questionDetails,
      Tags: {
        techTags: questionDetails.Tags?.filter((tag) => tag.Technologies)?.map(
          ({ Technologies }) => ({
            technologyId: Technologies?.technologyId,
            technology: Technologies?.technology,
          })
        ),
        projectTags: questionDetails.Tags?.filter((tag) => tag.Projects)?.map(
          ({ Projects }) => ({
            projectId: Projects?.projectId,
            projectName: Projects?.projectName,
          })
        ),
      },
    };

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_QUESTION_DETAILS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default getQuestionDetails;
