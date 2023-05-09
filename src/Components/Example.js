import React, { useState } from 'react';

function GalleryItem({ picture }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    setShowDetails(!showDetails);
  }

  return (
    <div>
      <img src={picture.url } alt={ picture.name } onClick={handleClick} />
      {showDetails && (
        <div>
          <p>Title: { picture.name }</p>
          <p>Author: { picture.author }</p>
          <p>Description: { picture.description }</p>
        </div>
      )}
    </div>
  );
}

function Gallery({ pictures }) {
  return (
    <div>
      {pictures.map(picture => (
        <GalleryItem picture={ picture } key={ picture.id } />
      ))}
    </div>
  );
}

export default Gallery;
