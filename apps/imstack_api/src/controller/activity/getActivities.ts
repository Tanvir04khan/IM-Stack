import { log } from "console";
import { NextFunction, Request, Response } from "express";

const getActivities = (req: Request, res: Response, next: NextFunction) => {
  log("TESTDSGTSHLIKSJ:LK:LS:");
  log(req.body);
  return res.json({ data: "hello" });
};

export default getActivities;
