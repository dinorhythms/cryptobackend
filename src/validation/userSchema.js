import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const signUpSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  firstname: JoiValidator.validateString().required(),
  lastname: JoiValidator.validateString().required(),
  phone: JoiValidator.validateNumber().required(),
  address: JoiValidator.validateString().required(),
  state: JoiValidator.validateString().required(),
  country: JoiValidator.validateString().required(),
  zipcode: JoiValidator.validateString().required(),
});

const signInSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
});

const authorizerSchema = Joi.object({
  uid: JoiValidator.validateString().required(),
});

export {
  signUpSchema, signInSchema, authorizerSchema
};
