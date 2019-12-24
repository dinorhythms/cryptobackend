import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const startInvestmentSchema = Joi.object({
  planId: JoiValidator.validateString().required(),
  amount: JoiValidator.validateNumber().required(),
});

const approveInvestmentSchema = Joi.object({
  investmentId: JoiValidator.validateString().required(),
});

export {
  startInvestmentSchema, approveInvestmentSchema
};
