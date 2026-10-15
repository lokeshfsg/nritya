import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container section-space text-center">
      <h1>404</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}
