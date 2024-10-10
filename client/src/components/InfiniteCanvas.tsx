//https://betterprogramming.pub/how-to-create-a-figma-like-infinite-canvas-in-react-a2b0365b2a7
// but also https://www.rob.directory/blog/infinite-canvas
import { useCallback, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import * as Canvas from "./canvas-lib";
import StickyNote from "./StickyNote";
import { Note } from "./notes";  

export type Geometry = {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};

// No longer need `addNoteAtPosition` from props because we handle note addition inside
export const InfiniteCanvas = forwardRef((props, ref) => {
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    {
      kind: "circle",
      radius: 20,
      x: 100,
      y: 100,
    },
  ]);

  const [notes, setNotes] = useState<Note[]>([]); // Now managing notes within the component

  const draw = useCallback<Canvas.Draw>(
    ({ ctx }) => {
      geometry.forEach((item) => {
        if (item.kind === "circle") {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = "blue";
          ctx.fill();
        }
      });
    },
    [geometry]
  );

  // Pass the geometry to the canvas hook
  const { camera, canvasRef } = Canvas.useInfiniteCanvas({ draw, geometry });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const setCanvasSize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [canvasRef]);

  // Expose this method to the parent component (App.js) via ref
  useImperativeHandle(ref, () => ({
    addStickyNoteAtCenter() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      // Calculate the center of the canvas in screen coordinates
      const canvasCenterX = canvasEl.width / 2;
      const canvasCenterY = canvasEl.height / 2;

      // Convert the center of the canvas to world coordinates
      const worldCoordinates = Canvas.toWorld({ x: canvasCenterX, y: canvasCenterY }, camera);

      // Add the sticky note at the calculated world coordinates
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: Date.now(),
          x: worldCoordinates.x,
          y: worldCoordinates.y,
          width: 100,
          height: 100,
          content: "New Sticky Note",
        },
      ]);
    },
  }));

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <canvas
        onClick={(event) => {
          const worldCoordinates = Canvas.coordinatesFromMouseEvent({
            camera,
            canvasRef,
            event,
          });
          if (!worldCoordinates) return;

          // Add a new circle on click
          setGeometry((prev) => [
            ...prev,
            {
              kind: "circle",
              radius: 20,
              x: worldCoordinates.x,
              y: worldCoordinates.y,
            },
          ]);
        }}
        ref={canvasRef}
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
          border: "1px solid black",
        }}
      />
      {/* Render sticky notes above the canvas */}
      {notes.map((note) => (
        <StickyNote
          text={"hewwo"}
          key={note.id}
          onClose={() => {
            // Remove the note from the list
            setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
          }}
          style={{
            position: "absolute",
            left: `${Canvas.toScreen({ x: note.x, y: note.y }, camera).x}px`,
            top: `${Canvas.toScreen({ x: note.x, y: note.y }, camera).y}px`,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
});
