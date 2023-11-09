// PhotoGallery.js

import React, { useState, useEffect } from 'react';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function PhotoGallery({ folderId, initialImages = 6 }) {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id,webContentLink,name)&key=AIzaSyDMl9CkM-8_2MFm5I239oYbCuxRqOjXVoc`)
      .then((response) => response.json())
      .then((data) => {
        const shuffled = shuffleArray(data.files).slice(0, initialImages);
        setShuffledImages(shuffled);
      })
      .catch((error) => console.error('Error fetching images: ', error));
  }, [folderId, initialImages]);

  useEffect(() => {
    // Reshuffle images when the user refreshes the page or switches tabs
    const handleBeforeUnload = () => {
      const reshuffled = shuffleArray(shuffledImages);
      setShuffledImages(reshuffled);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shuffledImages]);

  return (
    <div className="gallery">
      {shuffledImages.map((image) => (
        <img key={image.webContentLink} src={image.webContentLink} alt={image.name} />
      ))}
    </div>
  );
}

export default PhotoGallery;
