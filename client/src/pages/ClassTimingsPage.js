import { useState } from 'react';
import { timetableData, danceStyles } from '../data/siteContent';

export default function ClassTimingsPage() {
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');

  const schedule = timetableData.filter((item) => {
    const styleMatch = selectedStyle === 'All' || item.style === selectedStyle;
    const dayMatch = selectedDay === 'All' || item.day === selectedDay;
    return styleMatch && dayMatch;
  });

  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Class Timings</p>
        <h1>Weekly timetable and batch schedule</h1>
        <p>Regular class timings remain flexible, and the studio confirms each intake based on the chosen dance style, age group, and venue availability.</p>
      </div>

      <div className="card premium-card p-4 mb-4 filter-panel">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label">Dance style</label>
            <select className="form-select" value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
              <option value="All">All styles</option>
              {danceStyles.map((style) => (
                <option key={style.slug} value={style.name}>{style.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Day</label>
            <select className="form-select" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
              <option value="All">All days</option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {schedule.map((entry) => (
          <div className="col-md-6 col-xl-4" key={`${entry.day}-${entry.style}`}>
            <div className="card premium-card schedule-card h-100">
              <span className="chip">{entry.label}</span>
              <h3>{entry.style}</h3>
              <p className="schedule-day">{entry.day}</p>
              <ul className="feature-list compact-list">
                <li><strong>Time:</strong> {entry.time}</li>
                <li><strong>Age Group:</strong> {entry.ageGroup}</li>
                <li><strong>Format:</strong> {entry.label}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="card premium-card p-4 mt-5">
        <h3>Regular batch note</h3>
        <p className="mb-0">Kids batches run from 5:00 PM–6:00 PM and adult batches from 8:00 PM–9:00 PM. Saturday and Sunday include dedicated Belly Dance sessions, while other timings and styles remain subject to studio confirmation.</p>
      </div>
    </div>
  );
}
