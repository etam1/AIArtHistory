import React, { useState } from 'react';
import { ReactInfiniteCanvas } from 'react-infinite-canvas';
import PostItNote from './PostItNote'; // Import the PostItNote component

const InfiniteCanvasComponent = () => {
  const [notes, setNotes] = useState([]);

  // Function to add a new note with custom content
  const createNewNote = () => {
    // Prompt creating a Post-It Note
    const content = prompt('Enter note content:'); 
    
    const newNote = {
      id: notes.length + 1, // Generate unique id
      x: Math.random() * 400, // Random x position
      y: Math.random() * 400, // Random y position
      content, // Content entered by the user
    };
    setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to state
  };

  // const handleDrag = (id, x, y) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
  //   );
  // };


  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* creating post-it button */}
      <button 
        onClick={createNewNote} 
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
      >
        Add Post-It Note
      </button>

      <ReactInfiniteCanvas
        style={{ width: '100%', height: '100%', border: '1px solid black' }}
        // contentWillChange={(canvas) => console.log('Content will change')}
        // contentDidChange={(canvas) => console.log('Content did change')}
        scale={1}
        minScale={0.5}
        maxScale={5}
        wheelScaleFactor={0.1}
      >
        {/* Render Post-It Notes on the Infinite Canvas */}
        {notes.map((note) => (
          <PostItNote
            key={note.id}
            id={note.id}
            x={note.x}
            y={note.y}
            content={note.content}
            // onDrag={handleDrag}
          />
        ))}
      </ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;
