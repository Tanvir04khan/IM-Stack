import { Router, type RequestHandler } from "express";
import getUsers from "../controller/user/getUsers";
import getUserDetails from "../controller/user/getUserDetails";
import updateUserDetails from "../controller/user/updateUserDetails";
import addUser from "../controller/user/addUser";
import getUser from "../controller/user/getUser";

const userRouter = Router();

userRouter.post("/add-user", addUser as RequestHandler);

userRouter.get("/get-user/:clerkUserId", getUser as RequestHandler);

userRouter.get("/get-users/:userId", getUsers as RequestHandler);

userRouter.get("/get-userdetails/:userId", getUserDetails as RequestHandler);

userRouter.put("/update-userdetails", updateUserDetails as RequestHandler);

export default userRouter;
