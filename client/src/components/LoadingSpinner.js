export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="text-center py-5">
      <img
        src="https://s3-media0.fl.yelpcdn.com/bphoto/DuLl2pJ3vQul9kqYLL5ElQ/o.jpg"
        alt="Bollyhop"
        className="img-fluid rounded-circle shadow-sm"
        style={{ width: 96, height: 96, objectFit: 'cover' }}
      />
      <p className="mt-3 text-soft">{label}</p>
    </div>
  );
}
