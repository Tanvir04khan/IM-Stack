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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { clerkUserId } = req.params;
  console.log(clerkUserId, "from.......test");
  try {
    if (!clerkUserId) {
      throw new NodeError(
        ErrorMessage.GET_USERS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }
    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.clerkUserID, [clerkUserId]),
      with: {
        UsersRoles: {
          columns: {},
          with: {
            Roles: true,
            Projects: {
              columns: {
                projectName: true,
                projectId: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_USERS,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUser;
