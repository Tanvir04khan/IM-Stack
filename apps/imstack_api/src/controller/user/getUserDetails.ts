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
        Rewards: {
          columns: {
            score: true,
          },
        },
        UserTechnologies: {
          columns: { userTechId: true },
          with: {
            Technologies: true,
          },
        },
        UsersRoles: {
          columns: { usersRoleId: true },
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

    const data = {
      ...user,
      UsersRoles: user.UsersRoles.map(({ Projects, Roles, usersRoleId }) => ({
        usersRoleId,
        Roles,
        Projects: {
          ...Projects,
          icon: Projects?.iconType + "," + Projects?.icon.toString("base64"),
        },
      })),
      image: user.imageType
        ? user.imageType + "," + user.image?.toString("base64")
        : "",
    };

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_USER_DETAILS,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export default getUserDetails;
