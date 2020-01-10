import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const startInvestmentSchema = Joi.object({
  planId: JoiValidator.validateString().required(),
  amount: JoiValidator.validateNumber().required(),
});

const approveInvestmentSchema = Joi.object({
  investmentId: JoiValidator.validateString().required(),
});

const updatePublicSchema = Joi.object({
  investmentId: JoiValidator.validateString().required(),
  name: JoiValidator.validateString().required(),
  date: JoiValidator.validateString().required(),
  investmentAmount: JoiValidator.validateString().required(),
  payoutTime: JoiValidator.validateString().required(),
  payoutAmount: JoiValidator.validateString().required(),
});


export {
  startInvestmentSchema, approveInvestmentSchema, updatePublicSchema
};
