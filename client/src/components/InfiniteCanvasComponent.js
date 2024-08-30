import React, { useState } from 'react';
import { ReactInfiniteCanvas } from 'react-infinite-canvas';
import PostItNote from './PostItNote'; // Import the PostItNote component

const InfiniteCanvasComponent = () => {
  const [notes, setNotes] = useState([
    { id: 1, x: 100, y: 100, content: 'Note 1' },
    { id: 2, x: 300, y: 200, content: 'Note 2' },
  ]);

  const handleDrag = (id, x, y) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
  };

  const handleContentChange = (id, content) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ReactInfiniteCanvas
        style={{ width: '100%', height: '100%', border: '1px solid black' }}
        contentWillChange={(canvas) => console.log('Content will change')}
        contentDidChange={(canvas) => console.log('Content did change')}
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
            onDrag={handleDrag}
            onContentChange={handleContentChange}
          />
        ))}
      </ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;
