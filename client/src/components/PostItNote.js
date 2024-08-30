import React, { useState, useCallback } from 'react';

const PostItNote = ({ id, x, y, content, onDrag, onContentChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();  // Prevent the event from bubbling up to the canvas
    e.preventDefault();    // Prevent default behavior to avoid unwanted side effects
    setIsDragging(true);
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    setDragOffset({ x: clientX - x, y: clientY - y });
  }, [x, y]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    onDrag(id, clientX - dragOffset.x, clientY - dragOffset.y);
  }, [isDragging, dragOffset, onDrag, id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    onContentChange(id, noteContent);
  }, [noteContent, onContentChange, id]);

  const handleContentChange = useCallback((e) => {
    setNoteContent(e.target.value);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        width: '150px',
        height: '150px',
        backgroundColor: '#d0a47a',
        border: '1px solid black',
        padding: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // Handle mouse leave to stop dragging outside the note area
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <textarea
          autoFocus
          value={noteContent}
          onChange={handleContentChange}
          onBlur={handleBlur}
          style={{ width: '100%', height: '100%', resize: 'none', border: 'none', outline: 'none' }}
        />
      ) : (
        <div>{noteContent}</div>
      )}
    </div>
  );
};

export default PostItNote;
