import { useEffect, useState, useCallback, useRef } from 'react';

function BackgroundMusic({ folderId }) {
  const audioObjects = useRef({});
  const [audioFiles, setAudioFiles] = useState([]);
  const [remainingAudioIndices, setRemainingAudioIndices] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const playAudio = useCallback(() => {
    if (!isAudioPlaying && remainingAudioIndices.length > 0) {
      setIsAudioPlaying(true);
      const randomIndex = remainingAudioIndices[Math.floor(Math.random() * remainingAudioIndices.length)];
      const randomAudioUrl = audioFiles[randomIndex].webContentLink;
      let newAudio = audioObjects.current[randomAudioUrl];
      if (!newAudio) {
        newAudio = new Audio(randomAudioUrl);
        audioObjects.current[randomAudioUrl] = newAudio;
      }
      newAudio.loop = false;
      newAudio.volume = 0.5;
      newAudio.play().then(() => {
        const updatedIndices = remainingAudioIndices.filter((index) => index !== randomIndex);
        setRemainingAudioIndices(updatedIndices);
      }).catch((error) => console.error('Error playing audio: ', error));
    } else if (!isAudioPlaying && remainingAudioIndices.length === 0 && audioFiles.length > 0) {
      // All songs have been played, reset the playlist
      const shuffledIndices = audioFiles.map((_, index) => index);
      setRemainingAudioIndices(shuffledIndices);
    }
  }, [isAudioPlaying, remainingAudioIndices, audioFiles]);

  const fetchAudioFiles = useCallback(() => {
    if (sessionStorage.getItem('cachedAudioFiles')) {
      const cachedAudios = JSON.parse(sessionStorage.getItem('cachedAudioFiles'));
      setAudioFiles(cachedAudios);
      const shuffledIndices = cachedAudios.map((_, index) => index);
      setRemainingAudioIndices(shuffledIndices);
    } else {
      fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id,webContentLink,name,mimeType)&key=AIzaSyDMl9CkM-8_2MFm5I239oYbCuxRqOjXVoc`)
        .then((response) => response.json())
        .then((data) => {
          const filteredAudios = data.files.filter((file) => file.mimeType.startsWith('audio/'));
          setAudioFiles(filteredAudios);
          const shuffledIndices = filteredAudios.map((_, index) => index);
          setRemainingAudioIndices(shuffledIndices);
          sessionStorage.setItem('cachedAudioFiles', JSON.stringify(filteredAudios));
        })
        .catch((error) => console.error('Error fetching audio files: ', error));
    }
  }, [folderId]);
  
  useEffect(() => {
    if (!hasFetched) {
      if (sessionStorage.getItem('cachedAudioFiles')) {
        const cachedAudios = JSON.parse(sessionStorage.getItem('cachedAudioFiles'));
        setAudioFiles(cachedAudios);
        const shuffledIndices = cachedAudios.map((_, index) => index);
        setRemainingAudioIndices(shuffledIndices);
      } else {
        fetchAudioFiles();
      }
      setHasFetched(true);
    }
  }, [folderId, hasFetched, fetchAudioFiles]);

  useEffect(() => {
    document.addEventListener('mousedown', playAudio);

    return () => {
      document.removeEventListener('mousedown', playAudio);
    };
  }, [playAudio]);

  useEffect(() => {
    const handleAudioEnd = () => {
      setIsAudioPlaying(false);
      playAudio();
    };
  
    const currentAudioObjects = audioObjects.current;
  
    if (currentAudioObjects) {
      Object.values(currentAudioObjects).forEach((audio) => {
        audio.addEventListener('ended', handleAudioEnd);
      });
    }
  
    return () => {
      if (currentAudioObjects) {
        Object.values(currentAudioObjects).forEach((audio) => {
          audio.removeEventListener('ended', handleAudioEnd);
        });
      }
    };
  }, [audioObjects, playAudio]);  

  return null; // No visible UI elements for BackgroundMusic
}

export default BackgroundMusic;
