import { useEffect, useState } from 'react';
import api from '../services/api';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api.get('/faqs').then((res) => setFaqs(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div className="container section-space">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h1>Questions we hear most often</h1>
      </div>
      <div className="accordion" style={{ maxWidth: 900, margin: '0 auto' }}>
        {faqs.map((faq, index) => (
          <div className="faq-box" key={faq._id || index}>
            <h5>{faq.question}</h5>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
