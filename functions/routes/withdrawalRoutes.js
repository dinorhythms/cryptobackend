"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withdrawalController = _interopRequireDefault(require("../controllers/withdrawalController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _authorizer = _interopRequireDefault(require("../middlewares/authorizer"));

var _withdrawalMiddleware = require("../middlewares/withdrawalMiddleware");

var _withdrawalSchema = require("../validation/withdrawalSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getWithdrawals,
  getAllWithdrawals,
  getWithdrawal,
  adminGetWithdrawal,
  startWithdrawal,
  approveWithdrawal,
  settleWithdrawal
} = _withdrawalController.default;

const withdrawal = router => {
  router.route('/withdrawals').get(_userMiddlewares.checkToken, getWithdrawals).post(_userMiddlewares.checkToken, (0, _validator.default)(_withdrawalSchema.requestWithdrawalSchema), _withdrawalMiddleware.processWithdrawal, startWithdrawal);
  router.route('/withdrawals/:withdrawalId').get(_userMiddlewares.checkToken, (0, _validator.default)(_withdrawalSchema.withdrawalSchema), getWithdrawal);
  router.route('/admin/withdrawals').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), getAllWithdrawals);
  router.route('/admin/withdrawals/:withdrawalId').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_withdrawalSchema.withdrawalSchema), adminGetWithdrawal);
  router.route('/admin/withdrawals/:withdrawalId').post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_withdrawalSchema.withdrawalSchema), approveWithdrawal);
  router.route('/admin/withdrawals/:withdrawalId/settle').post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_withdrawalSchema.withdrawalSchema), settleWithdrawal);
};

var _default = withdrawal;
exports.default = _default;