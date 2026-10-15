import GalleryVideoGrid from '../components/GalleryVideoGrid';

export default function GalleryPage() {
  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Gallery</p>
        <h1>Moments from the studio</h1>
        <p>Explore a glimpse of energetic rehearsals, expressive classes, and confident performances that define the Nritya Nova experience.</p>
      </div>
      <GalleryVideoGrid />
    </div>
  );
}
