import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile: Joi.number()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  profile: Joi.number()
});

// Define otros esquemas de validación según tus necesidades
