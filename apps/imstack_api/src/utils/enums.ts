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
  QUESTION_UPDATE_DETAILS = "Please provide valid update details.",
  QUESTION_UPDATE_CHECK = "Either question not found or this user doesn't have access to update this question.",
  GET_QUESTION_DETAILS = "Please provide valid questionId.",
  ANSWER_POST_DETAILS = "Please provide valid answer details.",
  ANSWER_QUESTION = "Question not found. Please provide valid questionId.",
  ANSWER_UPDATE = "Answer not found. Please provide valid answer Id.",
  ADD_COMMENTS = "Please provide valid comment details.",
  DELETE_COMMENT = "Please provide valid delete details.",
  ADD_USER = "Please provide valid user details.",
  GET_USERS = "Please provide valid userId.",
  USER_EXIST = "User already exists.",
  ADMIN_ROLE = "User doesn't have admin role.",
  GET_USER_DETAILS = "Please provide valid userId.",
}

export enum SuccesMessage {
  ACTIVITIES = "Activities data found.",
  PROJECT_DOCS_CREATE = "Project documents added successfully.",
  PROJECT_DOC_DETAILS = "Project document detail found.",
  PROJECT_DOCS = "Project documents found.",
  PROJECT_DOC_DETAILS_UPDATE = "Project document updated successfully.",
  ADD_QUESTION = "Question added successfully.",
  UPDATE_QUESTION = "Question updated successfully.",
  GET_QUESTIONS = "Questions found.",
  GET_QUESTION_DETAILS = "Question details found.",
  POST_ANSWER = "Answer posted successfully.",
  UPDATE_ANSWER = "Answer updated successfully.",
  ADD_COMMENT = "Comment added successfully.",
  DELETE_COMMENT = "Comment deleted successfully.",
  ADD_USER = "User added successfully.",
  GET_USERS = "Users found.",
  GET_USER_DETAILS = "User details found.",
}

export enum TagsType {
  PROJECT = "project",
  QUESTION = "question",
}

export enum TagsTagType {
  PROJECT = "project",
  TECHNOLOGY = "technology",
}

export enum CommentType {
  QUESTION = "question",
  ANSWER = "answer",
}

export enum Score {
  ADD_QUESTION = 10,
  ADD_ANSWER = 10,
  LIKES = 5,
  ACCEPTED_AS_BEST_ANSWER = 5,
  CREATE_PROJECT = 100,
}

export enum Roles {
  ADMIN = "Admin",
  MANAGER = "Manager",
  WRITE = "Write",
}
