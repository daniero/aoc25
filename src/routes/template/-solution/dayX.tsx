import { useState } from 'react';
import inputTxt from './input.txt';

export function DayX() {
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
