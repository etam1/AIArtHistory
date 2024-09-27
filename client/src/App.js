// import React from 'react';
// import './App.css';
// import InfiniteCanvasComponent from './components/InfiniteCanvasComponent'; // Importing your custom component

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>AI Art History</h1>
//         <InfiniteCanvasComponent />
//       </header>
//     </div>
//   );
// }

// export default App;


import { useState } from "react"
import "./App.css"
import StickyNote from "./components/StickyNote"
import InfiniteCanvasComponent from './components/InfiniteCanvasComponent';


function App() {
    const [notes, setNotes] = useState([])
    function addNote() {
        setNotes([
            ...notes,
            {
                id: Date.now(),
            },
        ])
    }
    function removeNote(noteId) {
        setNotes(notes.filter((item) => item.id !== noteId))
    }
    return (
      <div className="App">
      <header className="App-header">
        <h1>AI Art History</h1>
        <InfiniteCanvasComponent />
        <button className="sticky-btn" onClick={addNote}>
                Create Note +
        </button>
        {notes.map((item) => (<StickyNote key={item.id} onClose={() => removeNote(item.id)} />))}
      </header>
    </div>
    )
}

export default App;
