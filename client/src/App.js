import React from 'react';
import './App.css';
import InfiniteCanvasComponent from './components/InfiniteCanvasComponent'; // Importing your custom component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Art History</h1>
        <InfiniteCanvasComponent />
      </header>
    </div>
  );
}

export default App;
