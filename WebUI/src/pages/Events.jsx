import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export default function Events() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    apiClient('/events')
      .then(setItems)
      .catch((e) => setErr(e.message));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Events</h2>
      <button onClick={logout} style={{ float: 'right' }}>Logout</button>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <ul>
        {items.map((e) => (
          <li key={e._id}>
            <b>{e.name}</b> — {new Date(e.date).toLocaleString()} @ {e.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
