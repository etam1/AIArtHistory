import { useRef } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "react-infinite-canvas";

function App() {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);

  return (
    <div className="workflowContainer">
      <div style={{ width: "700px", height: "400px", border: "1px solid red" }}>
        <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
            mountFunc.fitContentToView({ scale: 1 });
          }}
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
              position: "top-left",
              offset: { x: 120, y: 10 },
            },
          ]}
        >
          <div style={{ width: "200px", height: "200px", background: "red" }}>
            asdasdsdas
          </div>
        </ReactInfiniteCanvas>
      </div>
    </div>
  );
}

export default App;
