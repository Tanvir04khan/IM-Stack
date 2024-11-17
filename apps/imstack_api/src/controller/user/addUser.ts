import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { Rewards, Users } from "../../database/schema";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, emailId, clerkUserId, image } = req.body;
  try {
    if (!firstName || !lastName || !emailId || !clerkUserId) {
      throw new NodeError(
        ErrorMessage.ADD_USER,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const user = await database.query.Users.findFirst({
      where: (Users, { inArray }) => inArray(Users.clerkUserID, [clerkUserId]),
    });
    if (user) {
      throw new NodeError(
        ErrorMessage.USER_EXIST,
        APIStatusCode.FORBIDDEN,
        ErrorCode.INVALID_REQUEST
      );
    }
    let userImage, bImage;
    if (image) {
      userImage = image.split(",");

      bImage = Buffer.from(userImage[1], "base64");
    }

    const result = await database
      .insert(Users)
      .values({
        clerkUserID: clerkUserId,
        emailId,
        firstName,
        lastName,
        image: bImage ? bImage : null,
        imageType: userImage && userImage.length ? userImage[0] : null,
      })
      .returning({ userId: Users.userId });

    if (!result.length) {
      throw new NodeError(
        ErrorMessage.SOMETHING_WENT_WRONG,
        APIStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.SERVER_ERROR
      );
    }

    await database.insert(Rewards).values({
      score: 0,
      userId: result[0].userId,
    });

    res.status(APIStatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.ADD_USER,
      data: {
        userId: result[0].userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default addUser;
