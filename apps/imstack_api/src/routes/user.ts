import { Router, type RequestHandler } from "express";
import getUsers from "../controller/user/getUsers";
import getUserDetails from "../controller/user/getUserDetails";
import updateUserDetails from "../controller/user/updateUserDetails";
import addUser from "../controller/user/addUser";

const userRouter = Router();

userRouter.post("/add-users", addUser as RequestHandler);

userRouter.get("/get-users", getUsers as RequestHandler);

userRouter.get("/get-userdetails", getUserDetails as RequestHandler);

userRouter.put("/update-userdetails", updateUserDetails as RequestHandler);

export default userRouter;
