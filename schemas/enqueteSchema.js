import joi from 'joi';

const enqueteSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.string(),
});


export default enqueteSchema;