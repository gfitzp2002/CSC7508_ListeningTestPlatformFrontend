import React, { useState, useEffect } from 'react';
import { getAudio } from './AudioRoutes';

function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState('');
  const audioPlayer = document.getElementById('audio-player');

  const playAudio = () => {
    audioPlayer.src = audioUrl;
    audioPlayer.play();
  };

  useEffect(() => {
    const fetchAudio = async () => {
      const url = await getAudio(7);
      if (url) {
        setAudioUrl(url);
      }
    };

    fetchAudio();
  }, []);

  return (
    <div className='container text-center'>
      <div className='card-body'>
      <audio  id="audio-player"></audio>
      </div>      
      <div className='mt-3'>
        <button className='btn btn-danger' onClick={playAudio}>1kHz</button>
      </div>
    </div>
  );
}

export default AudioPlayer;


