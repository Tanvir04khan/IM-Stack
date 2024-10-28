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
  NO_DATA_FOUND = "NO_DATA_FOUND",
}

export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = "Internal server error.",
  SOMETHING_WENT_WRONG = "Something wnet wrong.",
  NO_DATA_FOUND = "No data found.",
  USERID = "Please provide valid userId.",
  ACTIVITIES_USER = "User not found.",
  PROJECT_POST_DETAILS = "Please provide valid project details.",
  PROJECT_DETAILS = "Please provide valid projectDocId.",
  QUESTION_ADD_DETAILS = "Please provide valid question details.",
}

export enum SuccesMessage {
  ACTIVITIES = "Activities data found.",
  PROJECT_DOCS_CREATE = "Project documents added successfully.",
  PROJECT_DOC_DETAILS = "Project document detail found.",
  PROJECT_DOCS = "Project documents found.",
  PROJECT_DOC_DETAILS_UPDATE = "Project document updated successfully.",
  ADD_QUESTION = "Question added successfully.",
}

export enum TagsType {
  PROJECT = "project",
  QUESTION = "question",
}

export enum TagsTagType {
  PROJECT = "project",
  TECHNOLOGY = "technology",
}
