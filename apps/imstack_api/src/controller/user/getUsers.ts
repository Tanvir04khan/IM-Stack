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

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      throw new NodeError(
        ErrorMessage.GET_USERS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }
    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.userId, [userId]),
      columns: {},
      with: {
        UsersRoles: {
          columns: {},
          with: {
            Roles: true,
          },
        },
      },
    });

    const hasAdminRole = user?.UsersRoles.some(
      ({ Roles }) => Roles.role === URoles.ADMIN
    );

    if (!hasAdminRole) {
      throw new NodeError(
        ErrorMessage.ADMIN_ROLE,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_REQUEST
      );
    }

    const data = await database.query.Users.findMany();

    if (!data.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_USERS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
