const videos = [
  { filename: 'events.mp4', title: 'Events' },
  { filename: 'wedding.mp4', title: 'Sangeet, Haldi & Marriage' },
  { filename: 'garba.mp4', title: 'Garba Dance' }
];

export default function GalleryVideoGrid() {
  return (
    <div className="gallery-grid">
      {videos.map(({ filename, title }) => (
        <div className="gallery-item" key={filename}>
          <h3 className="gallery-item-title">{title}</h3>
          <video
            autoPlay
            muted
            playsInline
            controls
            preload="auto"
            aria-label={`${title} dance video`}
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= 30) {
                event.currentTarget.pause();
                event.currentTarget.currentTime = 30;
              }
            }}
          >
            <source src={`${process.env.PUBLIC_URL}/videos/${filename}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
