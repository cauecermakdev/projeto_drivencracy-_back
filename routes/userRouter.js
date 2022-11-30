import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { schemaValidationMiddlewareUser } from '../middlewares/schemaValidationMiddlewareUser.js';

const userRouter = Router();
userRouter.get("/user", getUser);
userRouter.put("/user", schemaValidationMiddlewareUser, updateUser);
userRouter.delete("/user", deleteUser);
export default userRouter;
