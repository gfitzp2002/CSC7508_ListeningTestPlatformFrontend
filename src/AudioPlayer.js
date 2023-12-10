import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
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
    <Container className='text-center'>
      <audio  id="audio-player"></audio>
        <Button variant='primary' className='mt-3' onClick= {() => playAudio(audioUrl)}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>      
    </Container>
  );
}

export default AudioPlayer;


