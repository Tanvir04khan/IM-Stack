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
import { Technologies } from "../../database/schema";

const getTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const technologies = await database.query.Technologies.findMany();

    if (!technologies.length) {
      throw new NodeError(
        ErrorMessage.NO_DATA_FOUND,
        APIStatusCode.NOT_FOUND,
        ErrorCode.NO_DATA_FOUND
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.GET_TECH,
      data: technologies,
    });
  } catch (error) {
    next(error);
  }
};

export default getTechnologies;
