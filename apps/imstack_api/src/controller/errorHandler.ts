import type { NextFunction, Request, Response } from "express";
import { APIStatusCode, ErrorMessage, ResponseStatus } from "../utils/enums";
import NodeError from "../utils/NodeError";
import { log } from "console";

const errorHandler = (
  err: NodeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    log(err);
    return res.status(err.statusCode).send({
      status: ResponseStatus.ERROR,
      errorCode: err.code,
      message: err.message,
      data: {},
    });
  } catch (error) {
    log(error);
    return res.status(APIStatusCode.INTERNAL_SERVER_ERROR).send({
      status: ResponseStatus.ERROR,
      errorCode: err.code,
      message: ErrorMessage.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};

export default errorHandler;
