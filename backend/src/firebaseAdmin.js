// Firebase Admin setup placeholder.

let adminApp = null;

const initializeFirebaseAdmin = () => {
  // TODO: Add Firebase config here
  // Example:
  // adminApp = admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });

  return adminApp;
};

const getFirebaseAdmin = () => adminApp;

module.exports = {
  initializeFirebaseAdmin,
  getFirebaseAdmin,
};
