import firebaseAdmin from '../config/firebaseAdmin';
import firebaseClient from '../config/firebaseClient';
import messages from '../utils/messages';
import response, { errorResponse } from '../utils/response';

const { db, auth } = firebaseAdmin;
const { clientAuth } = firebaseClient;

const getUser = async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.data();
    user.admin = 'user';
    if (req.user.admin === true) {
      user.role = 'admin';
    }
    res.status(200).json({ user })
  } catch (error) {
    console.error(error);
  }
}

const getUsers = async (req, res) => {
  try {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => users.push(doc.data()));
    res.status(200).json({ users })
  } catch (error) {
    console.error(error);
  }
}

const checkEmailExist = async (email) => {
  try {
    const checkEmail = await auth.getUserByEmail(email);
    if(email) return true;
  } catch (error) {
    return false;
  }
}

const signUp = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone, address, state, country, zipcode } = req.body;

    const checkEmail = await checkEmailExist(email);
    if(checkEmail) return res.status(401).json({
      status: 'error',
      error: `email ${email} is not available, please check and try again`,  
    });

    const authUser = await auth.createUser({ email, password, phoneNumber: phone });
    const newUser = {
      email, roleId:1 , firstname, lastname, phone, address, state, country, zipcode, 
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), userId: authUser.uid
    }
    const user = await db.collection('users').doc(authUser.uid).set(newUser);
    //setup users wallet
    const newWallet = {
      userId: authUser.uid,
      balance: 0,
      totalProfit: 0,
      totalWithdraw: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await db.collection('wallets').doc(authUser.uid).set(newWallet);
    return res.status(201).json({
      status: 'success',
      message: 'user created successfully',  
      userId: authUser.uid
    })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await clientAuth.signInWithEmailAndPassword(email, password);
    const token = await data.user.getIdToken();

    //get user
    const decoded = await auth.verifyIdToken(token);

    const userDoc = await db.collection('users').doc(data.user.uid).get();
    const user = userDoc.data();
    user.role = 'user';
    if (decoded.admin === true) {
      user.role = 'admin';
    }
    return response(res, 201, 'success', { token, ...user });
  } catch (error) {
    if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
      return errorResponse(res, 403, 'error', messages.wrongCredentials)
    }
    return errorResponse(res, 500, 'error', error.message)
  }
}

const makeUserAdmin = async (req, res) => {
  try {
    const {uid} = req.body;
    await auth.setCustomUserClaims(uid, { admin: true });
    return response(res, 201, 'success',  {message: messages.makeAdminSuccess });
  } catch (error) {
    return errorResponse(res, 500, 'error', error.code)
  }
}

export default { getUsers, getUser, signUp, signin, makeUserAdmin };