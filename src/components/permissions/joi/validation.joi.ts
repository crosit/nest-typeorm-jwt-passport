import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  write: Joi.boolean().required(),
  read: Joi.boolean().required(),
  update: Joi.boolean().required(),
  delete: Joi.boolean().required(),
  profile: Joi.number().required(),
  element: Joi.number().required()
});

export const updateUserSchema = Joi.object({
  write: Joi.boolean(),
  read: Joi.boolean(),
  update: Joi.boolean(),
  delete: Joi.boolean(),
  profile: Joi.number(),
  element: Joi.number()
});

// Define otros esquemas de validación según tus necesidades
