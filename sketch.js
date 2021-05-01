import { canvasSketch } from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 5);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 30;

    // Create grid
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.025;
        points.push({
          // radius: Math.abs(random.gaussian() * 0.025),
          radius,
          position: [u, v],
          color: random.pick(palette),
        });
      }
    }
    return points;
  };

  // random.setSeed(60);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    // context.fillStyle = '#fff';
    // context.fillRect(0, 0, width, height);

    // Get px coords for grid points
    for (const data of points) {
      const { position, radius, color } = data;
      const [u, v] = position;
      // const x = u * width;
      // const y = v * height;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
    }
  };
};

canvasSketch(sketch, settings);
