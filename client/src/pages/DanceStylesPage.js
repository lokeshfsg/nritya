import { useEffect, useState } from 'react';
import api from '../services/api';
import DanceStyleCard from '../components/DanceStyleCard';
import { danceStyles } from '../data/siteContent';

export default function DanceStylesPage() {
  const [styles, setStyles] = useState(danceStyles);

  useEffect(() => {
    api.get('/dance-styles')
      .then((res) => {
        const apiStyles = res.data.data || [];
        const merged = [...danceStyles, ...apiStyles.filter((style) => !danceStyles.some((item) => item.name === style.name || item.slug === style.slug))];
        setStyles(merged);
      })
      .catch(() => setStyles(danceStyles));
  }, []);

  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Dance Styles</p>
        <h1>Find the rhythm that fits you</h1>
        <p>Every class is designed to help students build confidence, technique, and joyful movement in a supportive studio environment.</p>
      </div>
      <div className="row g-4">
        {styles.map((style) => (
          <div className="col-md-6 col-xl-4" key={style._id || style.slug || style.name}><DanceStyleCard style={style} /></div>
        ))}
      </div>
    </div>
  );
}
