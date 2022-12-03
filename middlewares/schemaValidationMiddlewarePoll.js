//./middlewares/schemaValidation.js
import enqueteSchema from "../schemas/enqueteSchema.js"

export function schemaValidationMiddlewarePoll(req,res,next){
    const poll = req.body;

    const validation = enqueteSchema.validate(poll);
    
    if(validation.error){
        return res.sendStatus(422);
    }
 
    next();
}