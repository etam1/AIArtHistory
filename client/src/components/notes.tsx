// define the Note "type" because typescript makes us do that
export type Note = {
  id: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
};
