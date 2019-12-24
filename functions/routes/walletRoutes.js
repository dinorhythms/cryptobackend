"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _walletController = _interopRequireDefault(require("../controllers/walletController"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getWallet
} = _walletController.default;

const wallet = router => {
  router.route('/wallet').get(_userMiddlewares.checkToken, getWallet);
};

var _default = wallet;
exports.default = _default;