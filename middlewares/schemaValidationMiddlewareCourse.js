//./middlewares/schemaValidation.js
import courseSchema from "../schemas/courseSchema.js"

export function schemaValidationMiddlewareCourse(req,res,next){
    console.log("entra schemaValidationMiddlewareCourse", schemaValidationMiddlewareCourse);
    const course = req.body;

    const validation = courseSchema.validate(course);
    
    if(validation.error){
        return res.sendStatus(422);
    }
 
    next();
}