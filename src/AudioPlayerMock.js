import React from 'react';

function AudioPlayerMock() {
    const playAudio = (src) => {
      const musicPlayer = document.getElementById('music-player');
      musicPlayer.src = src;
      musicPlayer.play();
    };
  
    return (
      <main className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div>
          <audio controls id="music-player"></audio>
  
          <div>
            <button onClick={() => playAudio('/audio/Cornet_A.wav')}>Cornet</button>
            <button onClick={() => playAudio('/audio/Flute_A.wav')}>Flute</button>
            <button onClick={() => playAudio('/audio/Soprano_Sax_A.wav')}>Soprano Sax</button>
            <button onClick={() => playAudio('/audio/Violin_A.wav')}>Violin</button>
          </div>
        </div>
      </main>
    );
  }

export default AudioPlayerMock;