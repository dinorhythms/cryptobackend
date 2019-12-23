"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebaseAdmin = _interopRequireDefault(require("../config/firebaseAdmin"));

var _firebaseClient = _interopRequireDefault(require("../config/firebaseClient"));

var _messages = _interopRequireDefault(require("../utils/messages"));

var _response = _interopRequireWildcard(require("../utils/response"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  db,
  auth
} = _firebaseAdmin.default;
const {
  clientAuth
} = _firebaseClient.default;

const getUsers = async (req, res) => {
  try {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => users.push(doc.data()));
    res.status(200).json({
      users
    });
  } catch (error) {
    console.error(error);
  }
};

const checkEmailExist = async email => {
  try {
    const checkEmail = await auth.getUserByEmail(email);
    if (email) return true;
  } catch (error) {
    return false;
  }
};

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      firstname,
      lastname,
      phone,
      address,
      state,
      country,
      zipcode
    } = req.body;
    const checkEmail = await checkEmailExist(email);
    if (checkEmail) return res.status(401).json({
      status: 'success',
      message: `email ${email} is not available, please check and try again`
    });
    const authUser = await auth.createUser({
      email,
      password,
      phoneNumber: phone
    });
    const newUser = {
      email,
      roleId: 1,
      firstname,
      lastname,
      phone,
      address,
      state,
      country,
      zipcode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: authUser.uid
    };
    const user = await db.collection('users').doc(authUser.uid).set(newUser);
    return res.status(201).json({
      status: 'success',
      message: 'user created successfully',
      userId: authUser.uid
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const signin = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const data = await clientAuth.signInWithEmailAndPassword(email, password);
    const token = await data.user.getIdToken();
    return (0, _response.default)(res, 201, 'success', {
      token
    });
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return (0, _response.errorResponse)(res, 403, 'error', _messages.default.wrongCredentials);
    }

    return (0, _response.errorResponse)(res, 500, 'error', error.code);
  }
};

const makeUserAdmin = async (req, res) => {
  try {
    const {
      uid
    } = req.body;
    await auth.setCustomUserClaims(uid, {
      admin: true
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.makeAdminSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.code);
  }
};

var _default = {
  getUsers,
  signUp,
  signin,
  makeUserAdmin
};
exports.default = _default;