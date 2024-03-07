import React, { useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getAudio } from '../service/AudioService';

function AudioPlayer({ audioFilename, isPlaying, togglePlay }) {
  //create ref to each individual audioPlayer component
  const audioRef = useRef(null);

  //sets the audioUrl when audioFilename is updated
  useEffect(() => {
    const fetchAudio = async () => {
      const url = await getAudio(audioFilename);
      console.log(url);
      if (url && audioRef.current) {
        audioRef.current.src = url;
      }
    };
    fetchAudio();
  }, [audioFilename]);

  //control the play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset the audio position to the start
      }
    }
  }, [isPlaying]);

 
  const handleButtonClick = () => {
    togglePlay(audioFilename); 
  };

  return (
    <Container className='text-center roboto-black'>
      <audio  ref={audioRef} ></audio>
        <Button variant='primary' size="lg" className='mt-3 w-100' onClick= {handleButtonClick}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>      
    </Container>
  );
}

export default AudioPlayer;


