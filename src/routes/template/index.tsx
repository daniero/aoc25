import { createFileRoute } from '@tanstack/react-router';
import inputTxt from './input.txt?raw';
import { useState } from 'react';

export const Route = createFileRoute('/template/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState(inputTxt);

  return (
    <>
      <h2>Day X</h2>

      <div>TODO</div>

      <button
        onClick={() => {
          setInput((prev) => prev.toUpperCase());
        }}
      >
        Go
      </button>
      <pre className="mt-5">{input}</pre>
    </>
  );
}
