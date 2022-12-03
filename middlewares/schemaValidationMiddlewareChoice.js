//./middlewares/schemaValidation.js
import opcaoVotoSchema from "../schemas/opcaoVotoSchema.js"

export function schemaValidationMiddlewareChoice(req,res,next){
    console.log("entra schemaValidationMiddlewareChoice", schemaValidationMiddlewareChoice);
    const choice = req.body;

    const validation = opcaoVotoSchema.validate(choice);
    
    if(validation.error){
        return res.sendStatus(422);
    }
 
    next();
}