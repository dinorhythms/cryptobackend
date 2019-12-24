import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const withdrawalSchema = Joi.object({
  withdrawalId: JoiValidator.validateString().required(),
});

const requestWithdrawalSchema = Joi.object({
  amount: JoiValidator.validateNumber().required(),
  bankName: JoiValidator.validateString().required(),
  accountName: JoiValidator.validateString().required(),
  accountNo: JoiValidator.validateString().required(),
});

export {
  withdrawalSchema, requestWithdrawalSchema
};
