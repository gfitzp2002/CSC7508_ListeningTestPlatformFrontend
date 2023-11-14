import React from 'react';
//import './App.css'; 

 // Import AudioPlayer component
import AudioPlayer from './AudioPlayer';
import AudioPlayerMock from './AudioPlayerMock';

function App() {
  return (
    <div className="App">
      <header>
        <div className="container text-center">
          <h1>Playing Audio Clips</h1>
          <h2>First Attempts at playing audio</h2>
        </div>
      </header>

      <main className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <AudioPlayer /> 
      </main>
      
    </div>
  );
}

export default App;
