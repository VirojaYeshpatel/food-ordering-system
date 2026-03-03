import React, { useState } from 'react';
import { signUpWithEmail, saveUserToFirestore } from '../services/auth';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const user = await signUpWithEmail({ email, password });
      await saveUserToFirestore(user);
      setMessage('Signup successful.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={handleSignup}>Create Account</button>
      <p>{message}</p>
    </>
  );
};

export default SignupScreen;
