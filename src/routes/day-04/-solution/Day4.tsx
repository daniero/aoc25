import { useEffect, useEffectEvent, useRef, useState } from 'react';
import inputTxt from './input.txt?raw';
import type { Message } from './Message.ts';

export function Day4() {
  const [input, setInput] = useState(inputTxt);
  const canvas = useRef<HTMLCanvasElement>(null);
  const worker = useRef<Worker>(null);

  const init = useEffectEvent(
    (
      worker: Worker,
      offscreenCanvas: OffscreenCanvas,
      c: HTMLCanvasElement,
    ) => {
      worker.postMessage(
        {
          type: 'init',
          canvas: offscreenCanvas,
          width: c.width,
          height: c.height,
          input,
        } satisfies Message,
        [offscreenCanvas],
      );
    },
  );

  useEffect(() => {
    const c = canvas.current;
    if (!c || worker.current) return;

    const zoom = window.devicePixelRatio * window.visualViewport!.scale;
    c.width = c.clientWidth * zoom;
    c.height = c.clientHeight * zoom;

    const offscreenCanvas = c.transferControlToOffscreen();
    worker.current = new Worker(new URL('worker.ts', import.meta.url));
    init(worker.current, offscreenCanvas, c);

    return () => {
      worker.current!.terminate();
    };
  }, []);

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
          className="bg-orange-950 text-white w-full aspect-square"
        />
      </div>
    </>
  );
}
