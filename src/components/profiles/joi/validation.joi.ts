import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
});

// Define otros esquemas de validación según tus necesidades
