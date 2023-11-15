import React from 'react';
import Question from './Question';

function App() {
  return (
    <div className="App">
      <header>
        <div className="container text-center">
          <h1>Auditory Atlas</h1>
        </div>
      </header>

      <main className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Question questionId={9}/> 
      </main>
      
    </div>
  );
}

export default App;
