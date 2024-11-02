import { NextFunction, Request, Response } from "express";
import { database } from "../../database/connection";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";

const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new NodeError(
        ErrorMessage.GET_USER_DETAILS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.userId, [userId]),
      with: {
        Rewards: true,
        UserTechnologies: {
          columns: {},
          with: {
            Technologies: true,
          },
        },
        UsersRoles: {
          columns: {},
          with: {
            Roles: true,
            Projects: {
              columns: {
                projectId: true,
                createdBy: true,
                createdOn: true,
                icon: true,
                projectName: true,
                iconType: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NodeError(
        ErrorMessage.ACTIVITIES_USER,
        APIStatusCode.NOT_FOUND,
        ErrorCode.INVALID_DATA
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_USER_DETAILS,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUserDetails;
