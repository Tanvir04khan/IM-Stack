import { Router, type RequestHandler } from "express";
import getUsers from "../controller/user/getUsers";
import getUserDetails from "../controller/user/getUserDetails";
import updateUserDetails from "../controller/user/updateUserDetails";

const userRouter = Router();

userRouter.get("/get-users", getUsers as RequestHandler);

userRouter.get("/get-userdetails", getUserDetails as RequestHandler);

userRouter.put("/update-userdetails", updateUserDetails as RequestHandler);

export default userRouter;
