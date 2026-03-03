/**
 * Firestore integration placeholder.
 *
 * TODO:
 * 1. Initialize Firebase Admin SDK with service account credentials.
 * 2. Export Firestore collections for restaurants and menus.
 * 3. Replace in-memory calls in routes with Firestore CRUD operations.
 */

const firestoreClient = {
  isConfigured: false,
  client: null,
};

function getFirestoreClient() {
  return firestoreClient;
}

module.exports = {
  getFirestoreClient,
};
