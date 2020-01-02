"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _authorizer = _interopRequireDefault(require("../middlewares/authorizer"));

var _userSchema = require("../validation/userSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getUsers,
  signUp,
  signin,
  makeUserAdmin,
  getUser
} = _authController.default;

const auth = router => {
  router.route('/auth/user').get(_userMiddlewares.checkToken, getUser);
  router.route('/auth/users').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), getUsers);
  router.route('/auth/signup').post((0, _validator.default)(_userSchema.signUpSchema), signUp);
  router.route('/auth/signin').post((0, _validator.default)(_userSchema.signInSchema), signin);
  router.route('/auth/makeadmin').post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_userSchema.authorizerSchema), makeUserAdmin);
};

var _default = auth;
exports.default = _default;