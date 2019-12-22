"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebaseServices = _interopRequireDefault(require("../config/firebaseServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  db,
  auth
} = _firebaseServices.default;

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
      message: 'user created successfully'
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};

var _default = {
  getUsers,
  signUp
};
exports.default = _default;