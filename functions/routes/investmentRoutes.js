"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _investmentController = _interopRequireDefault(require("../controllers/investmentController"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _userMiddlewares = require("../middlewares/userMiddlewares");

var _investmentMiddleware = require("../middlewares/investmentMiddleware");

var _investmentSchema = require("../validation/investmentSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getInvestments,
  startInvestment
} = _investmentController.default;

const investment = router => {
  router.route('/investments').get(_userMiddlewares.checkToken, getInvestments).post(_userMiddlewares.checkToken, (0, _validator.default)(_investmentSchema.startInvestmentSchema), _investmentMiddleware.processInvestment, startInvestment);
};

var _default = investment;
exports.default = _default;