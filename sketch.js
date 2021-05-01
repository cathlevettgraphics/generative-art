import { canvasSketch } from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 5;

    // Create grid
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    // Get px coords for grid points
    for (const [u, v] of points) {
      // const x = u * width;
      // const y = v * height;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 50, 0, Math.PI * 2, false);
      context.strokeStyle = '#333';
      context.lineWidth = 30;
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
