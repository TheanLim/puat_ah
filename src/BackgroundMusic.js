import { useEffect, useState } from 'react';

function BackgroundMusic({ folderId }) {
  const [audio, setAudio] = useState(new Audio());
  const [audioFiles, setAudioFiles] = useState(() => {
    const cachedAudioFiles = localStorage.getItem('cachedAudioFiles');
    return cachedAudioFiles ? JSON.parse(cachedAudioFiles) : [];
  });

  useEffect(() => {
    const playOnInteraction = () => {
      if (audioFiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const randomAudioUrl = audioFiles[randomIndex].webContentLink;
        setAudio(new Audio(randomAudioUrl));
        audio.loop = true;
        audio.volume = 0.5;
        audio.play();
        document.removeEventListener('mousedown', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      }
    };

    document.addEventListener('mousedown', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);

    return () => {
      document.removeEventListener('mousedown', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
    };
    // eslint-disable-next-line
  }, [audioFiles]);

  useEffect(() => {
    const playAudio = () => {
      if (audio.paused) {
        try {
          audio.play();
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    };

    window.addEventListener('click', playAudio);

    return () => {
      window.removeEventListener('click', playAudio);
    };
  }, [audio]);

  useEffect(() => {
    if (audioFiles.length === 0) {
      fetchAudioFiles();
    }
    // eslint-disable-next-line
  }, [folderId, audioFiles.length]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0; // Reset the audio to the beginning
      audio.play(); // Replay the audio when it ends
    });

    return () => {
      audio.removeEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
      });
    };
  }, [audio]);

  const fetchAudioFiles = () => {
    fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id,webContentLink,name,mimeType)&key=AIzaSyDMl9CkM-8_2MFm5I239oYbCuxRqOjXVoc`)
      .then((response) => response.json())
      .then((data) => {
        const filteredAudios = data.files.filter((file) => file.mimeType.startsWith('audio/'));
        setAudioFiles(filteredAudios);
        localStorage.setItem('cachedAudioFiles', JSON.stringify(filteredAudios));
      })
      .catch((error) => console.error('Error fetching audio files: ', error));
  };

  return null; // No visible UI elements for BackgroundMusic
}

export default BackgroundMusic;
