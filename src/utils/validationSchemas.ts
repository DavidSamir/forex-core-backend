import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const tradeSchema = Joi.object({
  type: Joi.string().valid('buy', 'sell').required(),
  symbol: Joi.string().required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().positive().required()
});
