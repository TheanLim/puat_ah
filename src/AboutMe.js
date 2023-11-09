import React from 'react';
import GoogleDocsContent from './GoogleDocsContent';
import PhotoGallery from './PhotoGallery';

function AboutMe() {
  return (
    <div className="container">
      <GoogleDocsContent docId="100f0wTU_xQQTjJBIHzB0NNapRrTbNszP_LyPVcMQQ88" title="About Me" />
      <PhotoGallery folderId="1VqqTMC0Yz7YhEHEmjSdvIxb51U8UUnAC" initialImages={12} />
    </div>
  );
}

export default AboutMe;