import React, { useEffect, useState, useRef } from 'react';

const AudioPlayer = ({ audioId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/audio/stream/${audioId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        setAudioUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching audio:', error);
    } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [audioId]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audioUrl) {
      audio.src = audioUrl;
      audio.load();
    }

    // Cleanup when the component unmounts
    return () => {
        audio.pause();
        audio.src = '';
        URL.revokeObjectURL(audioUrl);
      };
    }, [audioUrl]);

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div>
      {loading ? (
        <p>Loading Sick Beats ...</p>
      ) : (
        <button onClick={playAudio}>Play Audio</button>
      )}
    </div>
  );
};

export default AudioPlayer;