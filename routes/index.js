import {Router} from "express";
import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"
import courseRouter from "./courseRouter.js"

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(courseRouter);

export default router;
