import React, { useState } from 'react';
import { ReactInfiniteCanvas } from 'react-infinite-canvas';
import StickyNote from './StickyNote';
// import "./App.css";

const InfiniteCanvasComponent = () => {
  // const [notes, setNotes] = useState([]);

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
    
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Button to create new sticky note */}


      {/* <button
        onClick={createNewNote}
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
      >
        Add Sticky Note
      </button> */}

<button className="sticky-btn" onClick={addNote}>
                Create Note +
  </button>
  {notes.map((item) => (<StickyNote key={item.id} onClose={() => removeNote(item.id)} />))}


      <ReactInfiniteCanvas
        style={{ width: '100%', height: '100%', border: '1px solid black' }}
        scale={1}
        minScale={0.5}
        maxScale={5}
        wheelScaleFactor={0.1}
      >
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            onClose={() => removeNote(note.id)}
          />
        ))}
      </ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;
