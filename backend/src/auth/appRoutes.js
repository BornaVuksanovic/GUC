import express from "express";
import { Home } from "./glass.js";
import { AddGlass } from "./glass.js";
import { Info } from "./glass.js";
import { ChangeAmount } from "./glass.js";
import { SetGoal } from "./glass.js";
import { protectRoute } from "../middleware.js";

const appRouter = express.Router();

appRouter.route("/home").get(protectRoute,Home);
appRouter.route("/home/add").patch(protectRoute,AddGlass);
appRouter.route("/info").get(protectRoute,Info);
appRouter.route("/home/changeAmount").patch(protectRoute,ChangeAmount);
appRouter.route("/setGoal").patch(protectRoute,SetGoal);

export default appRouter;