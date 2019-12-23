import { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const { forbidden } = messages;

/**
 * @function authorize
 * @param {Array} permitedRoles the roles allowed to use the route
 * @returns {Object} decoded object
 * @description checks if the user is allowed to access the route
 */
const authorize = (permitedRoles) => (req, res, next) => {
  const user = req.user;
  if (user[permitedRoles] === true) {
    return next();
  }
  return errorResponse(res, 403, 'error', forbidden);
};

export default authorize;
