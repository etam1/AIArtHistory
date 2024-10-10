import React, { useState } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "react-infinite-canvas";
import StickyNote from "./StickyNote";
// import "./App.css";
//const canvasRef = useRef<ReactInfiniteCanvasHandle>();
const InfiniteCanvasComponent = () => {

  return (
    // <div
    //   style={{
    //     width: "100vw",
    //     height: "100vh",
    //     overflow: "hidden",
    //     position: "relative",
    //   }}
    // >
      <div>
      <ReactInfiniteCanvas
        // ref={canvasRef}
        //   onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
        //     mountFunc.fitContentToView({ scale: 1 });
        //   }}
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
        scale={1}
        minScale={0.5}
        maxScale={5}
        wheelScaleFactor={0.1}
      >
        customComponents={[
         {   
          component: (
              <button
                onClick={() => {
                  canvasRef.current?.fitContentToView({ scale: 1 });
                }}
              >
                fitToView
              </button>
            ),
            position: COMPONENT_POSITIONS.TOP_LEFT,
            offset: { x: 120, y: 10 },
        }

        ]}
      </ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;
