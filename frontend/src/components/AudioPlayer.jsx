import React, { useEffect, useState, useRef } from 'react';

const AudioPlayer = ({ audioId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const audioRef = useRef(new Audio());
  const audio = audioRef.current;

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

 // Add this log statement to check if the useEffect is triggered
    console.log('useEffect triggered');

    const handleTimeUpdate = () =>{
      setCurrentTime(audio.currentTime);
      console.log('Current Time:', audio.currentTime);
      };

    if (audioUrl) {
      audio.src = audioUrl;
      audio.type = 'audio/mpeg';
      audio.volume = volume;
      audio.currentTime = currentTime;

      audio.addEventListener('timeupdate', handleTimeUpdate);

      audio.load();
  
      audio.onloadedmetadata = () => {
        setCurrentTime(audio.currentTime);
        console.log('Duration:', audio.duration);
    };
  }

     // Cleanup when the component unmounts
     return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
      audio.src = '';
      URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl, volume, currentTime]);

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
    <div className='music-player'>
      {error ? (
        <p>{error}</p>
      ): loading ? (
        <p>Loading Sick Beats ...</p>
      ) : (
        <button onClick={toggleAudio}>{isPlaying ? 'Pause' : 'Play Audio'}</button>
      )}
      <input className='volume-bar'
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
    />
     <input className='time-scroll'
      type="range"
      min="0"
      max={audio.duration || 0} 
      step="0.1"
      value={currentTime}
      onChange={(e) => {
        setCurrentTime(parseFloat(e.target.value));
        audio.currentTime = parseFloat(e.target.value);
      }}
    />
    </div>
  );
};

export default AudioPlayer;