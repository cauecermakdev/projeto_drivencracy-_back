import joi from 'joi';

const courseSchema = joi.object({
  title: joi.string().required(),
  value: joi.string().required(),
  description: joi.string().required(),
});

export default courseSchema;