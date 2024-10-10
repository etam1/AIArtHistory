// App.js
import React from 'react';
import { useCallback, useEffect, useState, useRef } from "react";
import StickyNote from "./components/StickyNote"
import MyComponent from './components/MyComponent.tsx';
import { InfiniteCanvas } from './components/InfiniteCanvas.tsx';



function App() {
    const infiniteCanvasRef = useRef(null);

    const handleAddNote = () => {
        if (infiniteCanvasRef.current) {
            infiniteCanvasRef.current.addStickyNoteAtCenter();
        }
    };
  return (
    <div>
        <h1>AI Art History</h1>
        <button className="sticky-btn" onClick={handleAddNote}>
                Create Note +
        </button>

        
        <InfiniteCanvas ref={infiniteCanvasRef} />
        
    </div>
  );
}

export default App;

// import { useState } from "react"
// import "./App.css"
// import StickyNote from "./components/StickyNote"
// //import InfiniteCanvasComponent from './components/InfiniteCanvasComponent';
// import InfiniteCanvas from './components/InfiniteCanvas'

// function App() {
//     const [notes, setNotes] = useState([])
//     function addNote() {
//         setNotes([
//             ...notes,
//             {
//                 id: Date.now(),
//             },
//         ])
//     }
//     function removeNote(noteId) {
//         setNotes(notes.filter((item) => item.id !== noteId))
//     }
//     return (
//       <div className="App">
//       <header className="App-header">
//         <h1>AI Art History</h1>
//         <button className="sticky-btn" onClick={addNote}>
//                 Create Note +
//         </button>
//         <InfiniteCanvas/> 
   
//         {notes.map((item) => (<StickyNote key={item.id} onClose={() => removeNote(item.id)} />))}
//       </header>
//     </div>
//     )
// }

// export default App;
