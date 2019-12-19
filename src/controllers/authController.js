import firebaseAdmin from '../config/firebaseServices';

const { db } = firebaseAdmin;

const getUsers = async (req, res) => {
  try {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => users.push(doc.data()));
    res.status(200).json({
      users: users
    })
  } catch (error) {
    console.error(error);
  }
}

export default { getUsers };