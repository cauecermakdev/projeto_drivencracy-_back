//./middlewares/schemaValidation.js
import userSchema from "../schemas/userSchema.js"

export function schemaValidationMiddlewareUser(req,res,next){
    const user = req.body;

    const validation = userSchema.validate(user);
    
    if(validation.error){
        return res.sendStatus(422);
    }
 
    next();
}