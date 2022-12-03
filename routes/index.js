import {Router} from "express";
import choiceRouter from "./choiceRouter.js"
import pollRouter from "./pollRouter.js"

const router = Router();
router.use(choiceRouter);
router.use(pollRouter);

export default router;
