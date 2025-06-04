import admin from '../db/firebase/firebase.js'

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization; 

    if (!idToken) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Authorization token required!" }] });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error in fetchUser middleware:", error.message);
    return res.status(400).json({ errors: [{ msg: "Unauthorized" }] });
  }
};

export default verifyFirebaseToken;