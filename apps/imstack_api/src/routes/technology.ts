import { Router, type RequestHandler } from "express";
import getTechnologies from "../controller/technology/getTechnologies";

const technologyRoter = Router();

technologyRoter.get("/get-technologies", getTechnologies as RequestHandler);

export default technologyRoter;
