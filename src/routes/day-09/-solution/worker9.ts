import type { Message } from './Message.ts';
import { readLinesOfNumbers } from '../../../utils/input.ts';

let ctx: OffscreenCanvasRenderingContext2D;
let width = 500;
let height = 500;

let input: string;
let tiles: [number, number][];
let bounds: { minX: number; minY: number; maxX: number; maxY: number };

self.onmessage = ({ data: message }: MessageEvent<Message>) => {
  switch (message.type) {
    case 'init': {
      ctx = message.canvas.getContext('2d')!;
      width = message.width;
      height = message.height;
      input = message.input;

      tiles = readLinesOfNumbers(input) as [number, number][];
      let [minX, minY, maxX, maxY] = [...tiles[0], ...tiles[0]];
      tiles.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
      bounds = { minX, minY, maxX, maxY };
      console.log({ tiles, bounds });

      loop();
      break;
    }
    case 'set-input':
      console.log('set input', input, message.input);
  }
};

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, width, height);

  const padding = 100;
  const maxDistX = bounds.maxX - bounds.minX;
  const maxDistY = bounds.maxY - bounds.minY;

  const unitsX = (width - padding) / maxDistX;
  const unitsY = (height - padding) / maxDistY;

  ctx.beginPath();

  [...tiles, tiles[0]].forEach(([x, y]) => {
    const px = (x - bounds.minX) * unitsX + padding / 2;
    const py = (y - bounds.minY) * unitsY + padding / 2;

    ctx.fillStyle = 'white';
    const size = 10;
    ctx.fillRect(px - size / 2, py - size / 2, size, size);
    ctx.lineTo(px, py);
  });

  ctx.closePath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.globalCompositeOperation = 'lighter';
  ctx.stroke();
  ctx.fillStyle = '#ea0';
  ctx.fill();
}
