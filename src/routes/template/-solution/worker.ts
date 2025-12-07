import type { Message } from './Message.ts';

let ctx: OffscreenCanvasRenderingContext2D;
let width = 500;
let height = 500;

let input: string;

self.onmessage = ({ data: message }: MessageEvent<Message>) => {
  switch (message.type) {
    case 'init':
      ctx = message.canvas.getContext('2d')!;
      width = message.width;
      height = message.height;
      input = message.input;

      loop(performance.now());
      break;
    case 'set-input':
      console.log('set input', input, message.input);
  }
};

function loop(time: number) {
  requestAnimationFrame(loop);

  // ctx.clearRect(0, 0, width, height);
  const hue = (time / 30) % 360;
  const s = (75 + time / 1000) % 100;
  const l = Math.sin(time / 1000) * 50 + 50;
  ctx.fillStyle = `hsl(${String(hue)}, ${String(s)}%, ${String(l)}%)`;

  const w = (Math.random() * width) / 3;
  const h = (Math.random() * height) / 3;
  ctx.fillRect(
    Math.random() * (width + w / 2) - w / 2,
    Math.random() * (height + h / 2) - h / 2,
    w,
    h,
  );
}
