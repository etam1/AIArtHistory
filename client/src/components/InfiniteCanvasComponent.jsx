import React, { useState } from "react";
import { ReactInfiniteCanvas } from "react-infinite-canvas";
import StickyNote from "./StickyNote";
// import "./App.css";

const InfiniteCanvasComponent = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >

      <ReactInfiniteCanvas
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
        scale={1}
        minScale={0.5}
        maxScale={5}
        wheelScaleFactor={0.1}
      ></ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;
