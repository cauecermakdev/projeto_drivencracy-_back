import joi from 'joi';

const votoSchema = joi.object({
  createdAt: joi.string().required(),
  choiceId: joi.string().required(),
});

export default votoSchema;