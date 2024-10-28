import { Router, type RequestHandler } from "express";
import getActivities from "../controller/activity/getActivities";

const activityRoter = Router();

activityRoter.get("/get-activities/:userId", getActivities as RequestHandler);

export default activityRoter;
