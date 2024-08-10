import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum GenericMessage {
  USER_CREATED = "New user successfully created.",
  USER_LOGGED_IN = "User successfully logged in.",
  USER_ALREADY_LOGGED_IN = "User already logged in.",
  USER_DETAILS_UPDATED = "User details updated successfully.",
  USER_PASSWORD_UPDATED = "Password updated successfully.",
}

export enum GenericErrorMessage {
  INTERNAL_SERVER_ERROR = "Internal server error.",
  USER_ALREADY_EXIST = "User with this username or email already exist.",
  SAVE_FAILED = "Saving operation Failed.",
  ATTATCH_EMAIL_PW = "Please attach email and password.",
  USER_NOT_FOUND = "User not found.",
  INVALID_CREDS = "Invalid credentials.",
  ATTATCH_REFRESH_TOEKN_AND_UID = "Please attach uid and refresh token.",
  REFRESH_TOKEN_EXPIRED = "Refresh Token Expired.",
  INVALID_REFRESH_TOKEN = "Invalid or Expired Refresh Token.",
  JWT_SECRET_KEY_MISSING = "JWT secret key missing in .env file.",
  ATTATCH_UID = "Please attatch uid and data to update.",
  ATTATCH_JWT = "Please attatch JWT access token in headers.",
  JWT_NOT_AUTHENTICATED = "Invalid JWT access token.",
  JWT_NOT_AUTORIZED = "User is not authorized for this operation.",
  UPDATE_PASSWORD_FAILED = "Updating new password failed.",
  DUPLICATE_PHONE = "Phone number already in use.",
  DUPLICATE_USERNAME = "Username already in use.",
}

interface Response<T> {
  status: ResponseStatus;
  message: GenericMessage | GenericErrorMessage;
  data: T;
}

const data: Response<{ user: string }> = {
  status: ResponseStatus.SUCCESS,
  message: GenericMessage.USER_ALREADY_LOGGED_IN,
  data: { user: "skj" },
};

console.log(data);
