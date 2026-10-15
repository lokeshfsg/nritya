import { Link } from 'react-router-dom';

function createSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function DanceStyleCard({ style }) {
  const slug = style.slug || createSlug(style.name || 'dance-style');

  return (
    <div className="card premium-card h-100 dance-card">
      <Link to={`/dance/${slug}`} className="dance-card-link">
        <img
          src={style.image || style.bannerImage || 'https://png.pngtree.com/thumb_back/fh260/background/20230325/pngtree-dance-dynamic-fantasy-background-image_2103902.jpg'}
          alt={style.name}
          className="card-image"
        />
      </Link>
      <div className="card-body">
        <h5>{style.name}</h5>
        <p>{style.shortDescription || style.description || 'Discover a vibrant class experience built around confidence, expression, and rhythm.'}</p>
        <div className="meta-row">
          <span>{style.skillLevel || 'Beginner Friendly'}</span>
          <span>{style.ageGroup || 'All ages'}</span>
        </div>
        <Link to={`/dance/${slug}`} className="btn btn-primary mt-3">Explore More</Link>
      </div>
    </div>
  );
}
