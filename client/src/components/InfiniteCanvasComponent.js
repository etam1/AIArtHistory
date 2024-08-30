import React from 'react';
import { ReactInfiniteCanvas } from 'react-infinite-canvas';

const InfiniteCanvasComponent = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Main Infinite Canvas */}
      <ReactInfiniteCanvas
        style={{ width: '100%', height: '100%', border: '1px solid black' }}
        contentWillChange={(canvas) => console.log('Content will change')}
        contentDidChange={(canvas) => console.log('Content did change')}
        scale={1}
        minScale={0.5}
        maxScale={5}
        wheelScaleFactor={0.1}
      >
        {/* Add your interactive elements here */}
      </ReactInfiniteCanvas>
    </div>
  );
};

export default InfiniteCanvasComponent;

