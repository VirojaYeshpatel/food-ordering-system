const { getFirebaseAdmin } = require('../firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split('Bearer ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing Firebase ID token.' });
  }

  try {
    const adminApp = getFirebaseAdmin();

    if (!adminApp) {
      return res.status(503).json({
        message: 'Firebase Admin SDK is not initialized.',
      });
    }

    const decodedToken = await adminApp.auth().verifyIdToken(token);
    req.user = decodedToken;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Firebase ID token.',
      error: error.message,
    });
  }
};

module.exports = {
  verifyFirebaseToken,
};
