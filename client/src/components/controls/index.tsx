//import './styles.css';

export const Controls = ({ zoomState, getCanvasState }: any) => {
  // zoomState will be passed to all custom components
  const { scale } = zoomState;

  const onZoom = (action = 'out') => {
    const canvasState = getCanvasState();
    const { canvasNode, currentPosition, d3Zoom } = canvasState || {};
    const { k: currentScale } = currentPosition || {};
    const diff = action === 'out' ? -0.25 : 0.25;
    d3Zoom.scaleTo(canvasNode.transition().duration(500), currentScale + diff);
  };

  return (
    <div className="control-wrapper">
      <div onClick={() => onZoom()}>-</div>
      <div>{Math.round(scale * 100)} %</div>
      <div onClick={() => onZoom("in")}>+</div>
    </div>
  );
};
