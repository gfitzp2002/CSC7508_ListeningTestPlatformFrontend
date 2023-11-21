import React, { useState, useEffect } from 'react';
import { getAudio } from './AudioService';

function AudioPlayer({ audioFilename }) {
  const [audioUrl, setaudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = document.getElementById('audio-player');

  const playAudio = (url) => {
    if(isPlaying){
      audioPlayer.pause(); //is currently playing - pause
    } else {
      audioPlayer.src = url;
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying); //change the state of isPlaying value
  };

  useEffect(() => {
    const fetchAudio = async () => {
      const url = await getAudio(audioFilename);
      if (url) {
        setaudioUrl(url);
      }
    };
    fetchAudio();
  }, [audioFilename]);

  return (
    <div className='container text-center'>
      <audio  id="audio-player"></audio>
      <div className='mt-3'>
        <button className='btn btn-danger' onClick= {() => playAudio(audioUrl)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button> 

      </div>      
    </div>
  );
}

export default AudioPlayer;


