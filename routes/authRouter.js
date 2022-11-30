import {Router} from "express"
import {signUp, signIn} from '../controllers/authController.js'
import {schemaValidationMiddlewareUser} from '../middlewares/schemaValidationMiddlewareUser.js'

const authRouter = Router();
authRouter.post("/sign-up", schemaValidationMiddlewareUser,signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;