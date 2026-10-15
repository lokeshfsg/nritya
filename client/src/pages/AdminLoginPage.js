import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  }

  return (
    <div className="container section-space">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="card premium-card p-4" onSubmit={handleSubmit}>
            <h2 className="mb-4">Admin Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3"><input className="form-control" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
            <div className="mb-3"><input type="password" className="form-control" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
