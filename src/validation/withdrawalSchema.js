import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const withdrawalSchema = Joi.object({
  withdrawalId: JoiValidator.validateString().required(),
});

const requestWithdrawalSchema = Joi.object({
  btcAddress: JoiValidator.validateString().required(),
  amount: JoiValidator.validateNumber(),
  bankName: JoiValidator.validateString(),
  accountName: JoiValidator.validateString(),
  accountNo: JoiValidator.validateString(),
});

export {
  withdrawalSchema, requestWithdrawalSchema
};
