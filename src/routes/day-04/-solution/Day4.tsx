import { useEffect, useRef, useState } from 'react';
import inputTxt from './input.txt';

export function Day4() {
  const [input, setInput] = useState(inputTxt);

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('eff');
    const worker = new Worker(new URL('worker.ts', import.meta.url));
    if (canvas.current == null) return;

    const context = canvas.current.getContext('2d')!;
    context.clearRect(0, 0, 1000, 1000);
    context.fillStyle = '#fff';
    context.lineWidth = 2;
    context.fillRect(
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    );
    return () => {
      worker.terminate();
    };
  }, [input]);

  return (
    <>
      <h2 className="mb-5 text-2xl">Day 4</h2>

      <div className="w-lg">
        <div className="flex gap-2 justify-between mb-2">
          <button
            onClick={() => {
              setInput('');
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              setInput(inputTxt);
            }}
          >
            Edit input
          </button>
        </div>
        <canvas
          ref={canvas}
          className="bg-orange-950 text-white w-full"
          width="480"
          height="480"
        />
      </div>
    </>
  );
}
