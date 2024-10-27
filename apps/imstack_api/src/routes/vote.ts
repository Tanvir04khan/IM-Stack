import { Router, type RequestHandler } from "express";
import addVote from "../controller/vote/addVote";

const voteRoter = Router();

voteRoter.post("/add-vote", addVote as RequestHandler);

export default voteRoter;