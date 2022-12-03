import joi from 'joi';



const opcaoVotoSchema = joi.object({
  title: joi.string().required(),
  pollId: joi.string().required(),
});



export default opcaoVotoSchema;