import express from "express";
import { Home } from "./glass.js";
import { AddGlass } from "./glass.js";
import { Info } from "./glass.js";
import { protectRoute } from "../middleware.js";

const appRouter = express.Router();

appRouter.route("/home").get(protectRoute,Home);
appRouter.route("/home/add").patch(protectRoute,AddGlass);
appRouter.route("/info").get(protectRoute,Info);

export default appRouter;