"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settingController = _interopRequireDefault(require("../controllers/settingController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _authorizer = _interopRequireDefault(require("../middlewares/authorizer"));

var _settingSchema = require("../validation/settingSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getPlans,
  getPlan,
  getAllWithdrawals,
  getAccounts,
  updateAccount,
  updateSettings,
  getWithdrawal,
  adminGetWithdrawal,
  updatePlan,
  createAccount,
  approveWithdrawal,
  settleWithdrawal
} = _settingController.default;

const setting = router => {
  router.route('/plans').get(getPlans);
  router.route('/plans/:planId').get((0, _validator.default)(_settingSchema.planIdSchema), getPlan);
  router.route('/admin/plans/:planId').patch(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_settingSchema.updatePlanSchema), updatePlan);
  router.route('/admin/accounts').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), getAccounts).post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_settingSchema.createAccountSchema), createAccount);
  router.route('/admin/accounts/:accountId').patch(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_settingSchema.updateAccountSchema), updateAccount);
  router.route('/admin/settings').patch(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_settingSchema.settingsSchema), updateSettings);
};

var _default = setting;
exports.default = _default;