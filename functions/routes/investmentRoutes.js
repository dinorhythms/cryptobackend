"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _investmentController = _interopRequireDefault(require("../controllers/investmentController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _authorizer = _interopRequireDefault(require("../middlewares/authorizer"));

var _investmentMiddleware = require("../middlewares/investmentMiddleware");

var _investmentSchema = require("../validation/investmentSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getInvestments,
  getAllInvestments,
  getInvestment,
  adminGetInvestment,
  updatePublicInvestment,
  startInvestment,
  approveInvestment,
  settleInvestment,
  getPublicInvestments
} = _investmentController.default;

const investment = router => {
  router.route('/investments').get(_userMiddlewares.checkToken, getInvestments).post(_userMiddlewares.checkToken, (0, _validator.default)(_investmentSchema.startInvestmentSchema), _investmentMiddleware.processInvestment, startInvestment);
  router.route('/investments/:investmentId').get(_userMiddlewares.checkToken, (0, _validator.default)(_investmentSchema.approveInvestmentSchema), getInvestment);
  router.route('/admin/investments').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), getAllInvestments);
  router.route('/investmentpublic/').get(getPublicInvestments);
  router.route('/investmentpublic/:investmentId').patch(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_investmentSchema.updatePublicSchema), updatePublicInvestment);
  router.route('/admin/investments/:investmentId').get(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_investmentSchema.approveInvestmentSchema), adminGetInvestment);
  router.route('/admin/investments/:investmentId').post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_investmentSchema.approveInvestmentSchema), approveInvestment);
  router.route('/admin/investments/:investmentId/settle').post(_userMiddlewares.checkToken, (0, _authorizer.default)('admin'), (0, _validator.default)(_investmentSchema.approveInvestmentSchema), settleInvestment);
};

var _default = investment;
exports.default = _default;