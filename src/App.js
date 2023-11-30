import React from 'react';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <header>
        <div className="container text-center">
          <h1>Auditory Atlas</h1>
        </div>
      </header>

      <main className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#FCFAFA' }}>
        <Quiz categoryId={1}/> 
      </main>
      
    </div>
  );
}

export default App;
