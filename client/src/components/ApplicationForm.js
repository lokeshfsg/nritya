import { useEffect, useState } from 'react';
import api from '../services/api';

const createInitialState = (defaultStyle = 'Belly Dance') => ({
  fullName: '',
  parentGuardianName: '',
  dateOfBirth: '',
  age: '',
  studentCategory: 'Child',
  gender: '',
  phoneNumber: '',
  whatsappNumber: '',
  email: '',
  preferredDanceStyle: defaultStyle,
  experienceLevel: 'Beginner',
  preferredDaysAndTimes: 'Weekdays / Weekend',
  preferredClassFormat: 'Regular Classes',
  addressOrCity: '',
  additionalMessage: '',
  consentToPrivacyPolicy: false
});

export default function ApplicationForm({ defaultStyle = 'Belly Dance' }) {
  const [form, setForm] = useState(createInitialState(defaultStyle));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, preferredDanceStyle: defaultStyle || current.preferredDanceStyle }));
  }, [defaultStyle]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!form.fullName.trim()) {
      setError('Please enter the student full name.');
      setLoading(false);
      return;
    }

    if (!/^\d{7,15}$/.test(form.phoneNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!form.preferredDanceStyle) {
      setError('Please choose a dance style of interest.');
      setLoading(false);
      return;
    }

    if (!form.consentToPrivacyPolicy) {
      setError('Please consent to the privacy policy before submitting.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/applications', form);
      setSuccess(`${response.data.message} Reference: ${response.data.data.applicationReference}`);
      setForm(createInitialState(defaultStyle));
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card premium-card p-4" onSubmit={handleSubmit}>
      <h3 className="mb-4">Admission Enquiry</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-3">
        <div className="col-md-6"><input className="form-control" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Student's Full Name" required /></div>
        <div className="col-md-6"><input className="form-control" name="parentGuardianName" value={form.parentGuardianName} onChange={handleChange} placeholder="Parent/Guardian Name" /></div>
        <div className="col-md-3"><input className="form-control" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required /></div>
        <div className="col-md-3"><input className="form-control" type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required /></div>
        <div className="col-md-3">
          <select className="form-select" name="studentCategory" value={form.studentCategory} onChange={handleChange}>
            <option value="Child">Child</option>
            <option value="Adult">Adult</option>
          </select>
        </div>
        <div className="col-md-3"><input className="form-control" name="gender" value={form.gender} onChange={handleChange} placeholder="Gender (Optional)" /></div>
        <div className="col-md-6"><input className="form-control" type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Mobile Number" autoComplete="tel" inputMode="tel" maxLength="20" required /></div>
        <div className="col-md-6"><input className="form-control" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} placeholder="WhatsApp Number" /></div>
        <div className="col-md-6"><input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address (Optional)" /></div>
        <div className="col-md-6"><input className="form-control" name="preferredDanceStyle" value={form.preferredDanceStyle} onChange={handleChange} placeholder="Preferred Dance Style" required /></div>
        <div className="col-md-4">
          <select className="form-select" name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="col-md-4"><input className="form-control" name="preferredDaysAndTimes" value={form.preferredDaysAndTimes} onChange={handleChange} placeholder="Preferred Days and Times" /></div>
        <div className="col-md-4"><input className="form-control" name="preferredClassFormat" value={form.preferredClassFormat} onChange={handleChange} placeholder="Class Format" /></div>
        <div className="col-md-12"><input className="form-control" name="addressOrCity" value={form.addressOrCity} onChange={handleChange} placeholder="Address or City" /></div>
        <div className="col-md-12"><textarea className="form-control" rows="4" name="additionalMessage" value={form.additionalMessage} onChange={handleChange} placeholder="Additional Message" /></div>
        <div className="col-md-12 d-flex align-items-center gap-3">
          <input className="form-check-input" type="checkbox" name="consentToPrivacyPolicy" checked={form.consentToPrivacyPolicy} onChange={handleChange} required />
          <label className="form-check-label">I consent to the privacy policy and understand that seat confirmation is subject to academy approval.</label>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-soft">Indicative fee: ₹{form.studentCategory === 'Adult' ? '1,500' : '1,200'} onwards. Final fees are confirmed by the studio after availability review.</p>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
      </div>
    </form>
  );
}
