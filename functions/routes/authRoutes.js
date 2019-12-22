"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userSchema = require("../validation/userSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getUsers,
  signUp
} = _authController.default;

const auth = router => {
  router.route('/auth/users').get(getUsers);
  router.route('/auth/signup').post((0, _validator.default)(_userSchema.signUpSchema), signUp);
};

var _default = auth;
exports.default = _default;