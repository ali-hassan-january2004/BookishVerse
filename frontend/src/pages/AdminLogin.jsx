import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="wrap block login-page">
      <div className="login-panel">
        <p className="tag">BookishVerse studio</p>
        <h1>Welcome back.</h1>
        <p className="muted">Sign in to manage your library and stories.</p>
      <form className="login-form" onSubmit={submit}>
        <label htmlFor="admin-email">Email address</label>
        <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn btn-accent" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
      </div>
    </main>
  );
}
