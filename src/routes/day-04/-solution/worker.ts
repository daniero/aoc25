import type { Message } from './Message.ts';

let ctx: OffscreenCanvasRenderingContext2D;
let width = 500;
let height = 500;

let grid: string[][];

function setGrid(input: string) {
  grid = input.split('\n').map((line) => line.split(''));
}

self.onmessage = ({ data: message }: MessageEvent<Message>) => {
  switch (message.type) {
    case 'init':
      ctx = message.canvas.getContext('2d')!;
      width = message.width;
      height = message.height;
      setGrid(message.input);

      loop();
      break;
    case 'set-input':
      setGrid(message.input);
  }
};

function loop() {
  requestAnimationFrame(loop);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#fff';

  const margin = 4;
  const h = (height - margin) / grid.length;

  grid.forEach((row, y) => {
    const w = (width - margin) / row.length;

    row.forEach((cell, x) => {
      ctx.fillStyle = cell === '@' ? '#ece9e9' : '#eb2';
      ctx.fillRect(w * x + margin, h * y + margin, w - margin, h - margin);
    });
  });
}
