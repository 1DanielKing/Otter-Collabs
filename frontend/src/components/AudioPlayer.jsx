import React, { useEffect, useState, useRef } from 'react';

const AudioPlayer = ({ audioId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/audio/stream/${audioId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log('Audio URL:' , url);
        setAudioUrl(url);
      } catch (error) {
        console.error('Error fetching audio:', error);
        setError('Error fetching audio. Please try again')
    } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [audioId]);

  useEffect(() => {
    const audio = audioRef.current;
    console.log('Audio URL:' , audioUrl);

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

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch(error => console.error('Error playing audio:', error));
    }else{
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ): loading ? (
        <p>Loading Sick Beats ...</p>
      ) : (
        <button onClick={toggleAudio}>{isPlaying ? 'Pause' : 'Play Audio'}</button>
      )}
    </div>
  );
};

export default AudioPlayer;