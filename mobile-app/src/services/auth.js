// Mobile authentication placeholders.

export const signUpWithEmail = async ({ email, password }) => {
  // TODO: Add Firebase config here
  // Placeholder: Replace with Firebase createUserWithEmailAndPassword.
  return {
    uid: 'placeholder-user-uid',
    email,
  };
};

export const loginWithEmail = async ({ email, password }) => {
  // TODO: Add Firebase config here
  // Placeholder: Replace with Firebase signInWithEmailAndPassword.
  return {
    uid: 'placeholder-user-uid',
    email,
  };
};

export const loginWithGoogle = async () => {
  // Google login placeholder.
  // TODO: Add Firebase config here
  throw new Error('Google login is not implemented yet.');
};

export const saveUserToFirestore = async (user) => {
  // Firestore user save logic placeholder.
  // TODO: Add Firebase config here
  return {
    success: true,
    savedUser: user,
  };
};
