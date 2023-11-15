import React, { useState, useEffect } from 'react';
import { getAudio } from './AudioService';

function AudioPlayer({ referenceAudioFilename, questionAudioFilename }) {
  const [questionAudioUrl, setQuestionAudioUrl] = useState('');
  const [referenceAudioUrl, setReferenceAudioUrl] = useState('');
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
    const fetchReferenceAudio = async () => {
      const url = await getAudio(referenceAudioFilename);
      if (url) {
        setReferenceAudioUrl(url);
      }
    };

    const fetchQuestionAudio = async () => {
      const url = await getAudio(questionAudioFilename);
      if (url) {
        setQuestionAudioUrl(url);
      }
    };

    fetchReferenceAudio();
    fetchQuestionAudio();
  }, [referenceAudioFilename, questionAudioFilename]);

  return (
    <div className='container text-center'>
      <audio  id="audio-player"></audio>
      <div className='mt-3'>
        <button className='btn btn-danger me-2' onClick= {() => playAudio(referenceAudioUrl)}>Reference</button> 
        {/* some conditional to change the button text? */}
        <button className='btn btn-danger ms-2' onClick={ () => playAudio(questionAudioUrl)}> Question </button>
        {/* some conditional to change the button text? */}
      </div>      
    </div>
  );
}

export default AudioPlayer;


