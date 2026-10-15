import { useState } from 'react';
import api from '../services/api';

const initialState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  subject: '',
  message: '',
  preferredContactMethod: 'Phone'
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/contact', form);
      setSuccess('Your message has been sent successfully. Our team will get back to you soon.');
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card premium-card p-4" onSubmit={handleSubmit}>
      <h3 className="mb-4">Contact the Studio</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="row g-3">
        <div className="col-md-6"><input className="form-control" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required /></div>
        <div className="col-md-6"><input className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required /></div>
        <div className="col-md-6"><input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required /></div>
        <div className="col-md-6"><input className="form-control" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required /></div>
        <div className="col-md-12"><textarea className="form-control" rows="5" name="message" value={form.message} onChange={handleChange} placeholder="Message" required /></div>
        <div className="col-md-12">
          <select className="form-select" name="preferredContactMethod" value={form.preferredContactMethod} onChange={handleChange}>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4" disabled={loading}>{loading ? 'Submitting...' : 'Submit Message'}</button>
    </form>
  );
}
