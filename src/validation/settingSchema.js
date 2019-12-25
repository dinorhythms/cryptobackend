import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const planIdSchema = Joi.object({
  planId: JoiValidator.validateString().required(),
});

const accountIdSchema = Joi.object({
  accountId: JoiValidator.validateString().required(),
});

const updatePlanSchema = Joi.object({
  planId: JoiValidator.validateString().required(),
  name: JoiValidator.validateString().required(),
  description: JoiValidator.validateString().required(),
  investmentTime: JoiValidator.validateString().required(),
  minimum: JoiValidator.validateString().required(),
  maximum: JoiValidator.validateString().required(),
  percentage: JoiValidator.validateString().required(),
});

const createAccountSchema = Joi.object({
  name: JoiValidator.validateString().required(),
  accountNo: JoiValidator.validateString().required(),
});

const updateAccountSchema = Joi.object({
  accountId: JoiValidator.validateString().required(),
  name: JoiValidator.validateString().required(),
  accountNo: JoiValidator.validateString().required(),
});

const settingsSchema = Joi.object({
  currency: JoiValidator.validateString().required(),
  currencySign: JoiValidator.validateString().required(),
});

export {
  planIdSchema, updatePlanSchema, createAccountSchema, 
  accountIdSchema, updateAccountSchema, settingsSchema
};
