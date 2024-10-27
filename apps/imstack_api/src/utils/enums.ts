export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum APIStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 402,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorCode {
  SERVER_ERROR = "SERVER_ERROR",
  INVALID_DATA = "INVALID_DATA",
  INVALID_JWT_TOKEN = "INVALID_JWT_TOKEN",
  INVALID_REQUEST = "INVALID_REQUEST",
  INVALID_CREDS = "INVALID_CREDS",
}

export enum ErrorMessage {}
