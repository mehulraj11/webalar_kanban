import express from "express";
import {
    signup,
    login,
    getCount,
    getCurrentUser
} from "../controllers/UserController.js";
import jwtAuth from "../middlewares/UserAuthMiddleware.js";

const userRouter = express.Router();

// Routes
userRouter.post("/signup", signup);
userRouter.post("/signin", login);
userRouter.get("/count", getCount);
userRouter.get("/me", jwtAuth, getCurrentUser);

export default userRouter;
