import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ApplicationForm from '../components/ApplicationForm';
import { danceStyles, getDanceStyleBySlug } from '../data/siteContent';

export default function DanceDetailsPage() {
  const { slug } = useParams();
  const [style, setStyle] = useState(getDanceStyleBySlug(slug) || danceStyles[0]);
  const [settings, setSettings] = useState({});
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const found = getDanceStyleBySlug(slug) || danceStyles[0];
    setStyle(found);
    setSelectedImage(found.gallery?.[0] || found.bannerImage || found.image);
  }, [slug]);

  useEffect(() => {
    api.get('/settings/public').then((res) => setSettings(res.data.data || {})).catch(() => {});
  }, []);

  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I am interested in joining the ${style.name} class.`)}`
    : 'https://wa.me/?text=' + encodeURIComponent('Hi, I am interested in joining a dance class.');

  return (
    <div className="container section-space detail-page">
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(14,10,26,0.4), rgba(14,10,26,0.7)), url(${style.bannerImage || style.image})` }}>
        <div>
          <p className="eyebrow">Dance Style</p>
          <h1>{style.name}</h1>
          <p>{style.shortDescription}</p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/admission" className="btn btn-primary">Join This Class</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-secondary">Contact Us on WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4 align-items-start">
        <div className="col-lg-8">
          <div className="card premium-card p-4">
            <h3>About this style</h3>
            <p>{style.description}</p>
            <div className="info-pills">
              <span>{style.skillLevel}</span>
              <span>{style.ageGroup}</span>
              <span>{style.schedule}</span>
            </div>
          </div>

          <div className="card premium-card p-4 mt-4">
            <h3>Gallery</h3>
            <div className="detail-gallery-main">
              <img src={selectedImage} alt={style.name} />
            </div>
            <div className="detail-gallery-thumbs">
              {(style.gallery || [style.image]).map((image) => (
                <button key={image} type="button" className="thumb-button" onClick={() => setSelectedImage(image)}>
                  <img src={image} alt={`${style.name} sample`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card premium-card p-4 info-column">
            <h3>Class Details</h3>
            <ul className="feature-list">
              <li><strong>Batch:</strong> {style.schedule}</li>
              <li><strong>Timing:</strong> {style.schedule}</li>
              <li><strong>Best for:</strong> {style.ageGroup}</li>
              <li><strong>Experience:</strong> {style.skillLevel}</li>
            </ul>
          </div>

          <div className="card premium-card p-4 mt-4 info-column">
            <h3>Benefits</h3>
            <ul className="feature-list">
              {style.benefits?.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card premium-card p-4">
            <h3>Beginner friendly</h3>
            <p>New students are welcomed with clear guidance, encouraging feedback, and age-appropriate movement practice. Class pacing is shaped to suit confidence and learning, with support for beginners and returning dancers alike.</p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card premium-card p-4">
            <h3>Related styles</h3>
            <div className="related-styles">
              {style.related?.map((slugName) => {
                const relatedStyle = getDanceStyleBySlug(slugName) || danceStyles.find((item) => item.slug === slugName);
                if (!relatedStyle) return null;
                return (
                  <Link key={relatedStyle.slug} to={`/dance/${relatedStyle.slug}`} className="related-link">
                    {relatedStyle.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ApplicationForm defaultStyle={style.name} />
      </div>
    </div>
  );
}
