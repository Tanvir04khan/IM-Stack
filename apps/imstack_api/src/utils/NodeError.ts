import { APIStatusCode, ErrorCode, ErrorMessage } from "./enums";

export default class NodeError extends Error {
  statusCode: APIStatusCode;
  code: ErrorCode;

  constructor(
    message: ErrorMessage = ErrorMessage.INTERNAL_SERVER_ERROR,
    statusCode = APIStatusCode.INTERNAL_SERVER_ERROR,
    code = ErrorCode.SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
