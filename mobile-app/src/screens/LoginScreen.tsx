import React, { useState } from 'react';
import { loginWithEmail, loginWithGoogle } from '../services/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await loginWithEmail({ email, password });
      setMessage('Login successful.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setMessage('Google login successful.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <p>{message}</p>
    </>
  );
};

export default LoginScreen;
