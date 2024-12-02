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

const getTopFiveUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await database.query.Rewards.findMany({
      columns: {
        score: true,
      },
      with: {
        Users: {
          columns: {
            firstName: true,
            lastName: true,
            image: true,
            imageType: true,
            userId: true,
          },
        },
      },
    });

    if (!users) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    const data = users
      .map(({ score, Users }) => ({
        score,
        Users: {
          ...Users,
          image: Users.imageType
            ? Users.imageType + "," + Users.image?.toString("base64")
            : "",
        },
      }))
      .sort((a, b) => b.score - a.score);

    if (data.length > 5) data.length = 5;

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_USERS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default getTopFiveUsers;
