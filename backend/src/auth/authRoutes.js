import express from "express";
import { register } from "./auth.js";
import { login } from "./auth.js";
import { deleteUser } from "./auth.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/deleteUser").delete(deleteUser);

export default authRouter;