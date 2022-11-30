import { Router } from 'express';
import { getCourses, updateCourse, deleteCourse,postCourse } from '../controllers/courseController.js';
import { schemaValidationMiddlewareUser } from '../middlewares/schemaValidationMiddlewareUser.js';
import { schemaValidationMiddlewareCourse } from '../middlewares/schemaValidationMiddlewareCourse.js';

const userRouter = Router();
userRouter.get("/courses", getCourses);
userRouter.post("/courses",schemaValidationMiddlewareCourse,postCourse);

userRouter.put("/courses", schemaValidationMiddlewareUser, updateCourse);
userRouter.delete("/courses", deleteCourse);
export default userRouter;
