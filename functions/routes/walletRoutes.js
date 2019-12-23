"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _walletController = _interopRequireDefault(require("../controllers/walletController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _authorizer = _interopRequireDefault(require("../middlewares/authorizer"));

var _userSchema = require("../validation/userSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getWallet
} = _walletController.default;

const wallet = router => {
  router.route('/wallet').get(_userMiddlewares.checkToken, getWallet); // router.route('/wallet')
  //   .post(authorize('admin'), signUp);
  // router.route('/wallet')
  //   .patch(authorize('admin'), signin);
};

var _default = wallet;
exports.default = _default;