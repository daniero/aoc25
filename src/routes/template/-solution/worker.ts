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
  const hue = 217 + ((time / 22 + Math.random() * 12) % 360);
  const s = (60 + 40 * Math.sin(time / 1000)) % 100;
  const l = 50 + Math.sin(time / 443) * 50;
  ctx.fillStyle = `hsl(${String(hue)}, ${String(s)}%, ${String(l)}%)`;

  const max = 7.5;
  const period = 7500;
  const t = time % period;
  const stretch = max / 2 + (max / 2) * Math.sin((t * Math.PI * 2) / period);
  const w = (Math.random() * width) / stretch;
  const h = (Math.random() * height) / (max - stretch);

  ctx.fillRect(
    Math.random() * (width + w / 2) - w / 2,
    Math.random() * (height + h / 2) - h / 2,
    w,
    h,
  );
}
