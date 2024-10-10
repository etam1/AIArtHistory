// Adapted from Robby Pruzan 6/30/24 https://www.rob.directory/blog/infinite-canvas
import { MutableRefObject, useEffect, useRef, useState } from "react";

export type Coordinate = {
  x: number;
  y: number;
};
export type Camera = {
  zoom: number;
} & Coordinate;

export const toWorld = (
  screenCoord: Coordinate,
  camera: Camera
): Coordinate => {
  return {
    x: camera.x + screenCoord.x / camera.zoom,
    y: camera.y + screenCoord.y / camera.zoom,
  };
};

export const toScreen = (
  worldCoord: Coordinate,
  camera: Camera
): Coordinate => {
  return {
    x: (worldCoord.x - camera.x) * camera.zoom,
    y: (worldCoord.y - camera.y) * camera.zoom,
  };
};

export const coordinatesFromMouseEvent = ({
  event,
  camera,
  canvasRef,
}: {
  event: { clientX: number; clientY: number };
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  camera: Camera;
}) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  return toWorld({ x: mouseX, y: mouseY }, camera);
};

export type Draw = ({
  canvas,
  ctx,
}: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}) => void;

export type Geometry = {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};


export const useInfiniteCanvas = ({ draw, geometry }: { draw: Draw; geometry: Geometry[];}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x, -camera.y);

    draw({
      canvas,
      ctx,
    });

    ctx.restore();
  }, [camera, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => { // what to do when someone mousewheels
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // const minX = Math.min(...geometry.map((item) => item.x - item.radius));
      // const maxX = Math.max(...geometry.map((item) => item.x + item.radius));
      // const minY = Math.min(...geometry.map((item) => item.y - item.radius));
      // const maxY = Math.max(...geometry.map((item) => item.y + item.radius));

      // console.log("bounding box for geometry: %d , %d, %d, %d",minX, maxX, minY, maxY)

      if (e.ctrlKey) {
        console.log("zooming")
        // Apply zoom factor
        const zoomFactor = Math.pow(0.99, e.deltaY);
        const newZoom = camera.zoom * zoomFactor;
      
        // Get the mouse position in world coordinates before the zoom
        const mouseWorldBefore = toWorld({ x: mouseX, y: mouseY }, camera);
      
        // Create a new camera with the updated zoom
        const newCamera = { ...camera, zoom: newZoom };
      
        // Get the mouse position in world coordinates after the zoom
        const mouseWorldAfter = toWorld({ x: mouseX, y: mouseY }, newCamera);
      
        // Calculate the difference between world positions and adjust the camera
        const newX = camera.x + (mouseWorldBefore.x - mouseWorldAfter.x);
        const newY = camera.y + (mouseWorldBefore.y - mouseWorldAfter.y);
      
        // Update the camera state with the new position and zoom level
        setCamera({
          x: newX,
          y: newY,
          zoom: newZoom,
        });
      }
      
      
      else {
          // Handle panning
          console.log("panning!");

          setCamera((prev) => ({
            ...prev,
            // ensure the translation is consistent with the current world view (how much we are zoomed in)
            ...toWorld({ x: e.deltaX, y: e.deltaY }, prev),
          }));
        }
      }
        
    canvas.addEventListener("wheel", handleWheel);
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [camera]);

  return { camera, canvasRef, setCamera };
};
