import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

export default function Login() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiClient('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      localStorage.setItem('token', res.accessToken || res.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: '100%' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
