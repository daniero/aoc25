import { Fragment, useRef, useState } from 'react';
import inputTxt from './input.txt?raw';
import { clsx } from 'clsx/lite';

export function Day10() {
  const [input] = useState(() =>
    inputTxt.replaceAll(/[.#]/g, (s) => (s === '.' ? '#' : '.')),
  );
  const [state, setState] = useState(() => parseInput(input));
  const [edit, setEdit] = useState(false);
  const [tmp, setTmp] = useState('');
  const pre = useRef<HTMLPreElement>(null);

  function pushButton(machineNumber: number, button: number[]) {
    setState((oldState) =>
      oldState.map((machine, rowIndex) => {
        if (rowIndex !== machineNumber) return machine;
        return {
          ...machine,
          lights: machine.lights.map((light, i) => {
            if (button.some((n) => n === i)) return (1 - light) as 0 | 1;
            return light;
          }),
          joltage: machine.joltage.map((jolt, i) => {
            if (button.some((n) => n === i)) return jolt - 1;
            return jolt;
          }),
        };
      }),
    );
  }

  return (
    <>
      <h2 className="text-2xl">Day 10</h2>
      <div className="flex mb-8 gap-3 items-center">
        <p className="text-orange-900">Click the buttons to solve ¯\_(ツ)_/¯</p>
        <button
          className="hover:bg-amber-300 ml-auto"
          onClick={() => {
            if (edit) {
              // save
              const value = tmp.split(/(?<=})\B(?=\[)/).join('\n');
              console.log(JSON.stringify(value));
              setState(parseInput(value));
            } else {
              // edit
              const textContent = pre.current?.textContent
                .split(/(?<=})\B(?=\[)/)
                .join('\n');
              setTmp(textContent ?? '');
            }
            setEdit((e) => !e);
          }}
        >
          {edit ? 'save' : 'edit'}
        </button>
        <button
          className="hover:bg-amber-300"
          onClick={() => {
            if (edit) {
              setEdit(false);
            } else {
              setState(parseInput(input));
            }
          }}
        >
          {edit ? 'cancel' : 'reset'}
        </button>
      </div>
      <pre ref={pre} className="whitespace-pre inline-block relative">
        {edit && (
          <textarea
            className="absolute inset-0 text-sm bg-orange-50"
            autoFocus
            value={tmp}
            onChange={(e) => {
              setTmp(e.target.value);
            }}
          />
        )}
        {state.map((machine, i) => (
          <Machine
            key={machine.id}
            {...machine}
            click={(button: number[]) => {
              pushButton(i, button);
            }}
          />
        ))}
      </pre>
      <details className="mt-20">
        <summary className="text-red-950">
          <span className="hover:bg-amber-300 cursor-pointer">help</span>
        </summary>
        <ul className="block px-5">
          <li className="list-disc">
            The buttons are obviously what looks for example like this:{' '}
            <pre className="inline">
              <button className="text-sm">(1,3)</button>
            </pre>{' '}
          </li>
          <li className="list-disc">
            Solve part 1 or 2, or both at the same time!
          </li>
          <li className="list-disc">
            Part 1: The lights (
            <samp className="font-mono text-sm">[.##.]</samp>) are inverted with
            respect to what they are originally in the sample input, so that you
            solve each line by turning all the lights on simultaneously. The
            button push sequences required to solve are still the same.
          </li>
          <li className="list-disc">
            Part 2: The joltage shown (
            <samp className="font-mono text-sm">{'{1,4,3}'}</samp>) is the{' '}
            <em>remaining</em> values needed. You solve part 2 by setting all
            joltages to zero.
          </li>
          <li>
            You may edit the input/state, but it will probably crash if it's not
            formatted correctly
          </li>
        </ul>
      </details>
    </>
  );
}

function Machine({
  lights,
  buttons,
  joltage,
  click,
}: {
  lights: number[];
  buttons: number[][];
  joltage: number[];
  click: (button: number[]) => void;
}) {
  const lightsSolved = lights.every((light) => light === 1);
  const joltsSolved = joltage.every((jolt) => jolt === 0);

  return (
    <div className="text-sm">
      [
      <span className={clsx(lightsSolved && 'text-green-800 glow')}>
        {lights.map((light) => (light === 1 ? '#' : '.'))}
      </span>
      {'] '}
      {buttons.map((button, i) => (
        <Fragment key={`button-${i.toString()}`}>
          <button
            className="hover:bg-amber-300 cursor-pointer"
            onClick={() => {
              click(button);
            }}
          >
            ({button.join(',')})
          </button>{' '}
        </Fragment>
      ))}
      {'{'}
      {joltage.map((jolt, i) => {
        return (
          <Fragment key={`jolt-${i.toString()}`}>
            <span
              className={clsx(
                joltsSolved && 'text-green-800 glow',
                jolt < 0 && 'text-red-500',
              )}
            >
              {jolt}
            </span>
            {i < joltage.length - 1 && ','}
          </Fragment>
        );
      })}
      {'}'}
    </div>
  );
}

function parseInput(input: string) {
  return input.split('\n').map((line) => {
    const [a, b, c] = line.split(/(?<=])\s|\s(?=\{)/);

    return {
      id: crypto.randomUUID(),
      lights: (a.match(/[.#]/g) ?? []).map((ch) => (ch === '#' ? 1 : 0)),
      buttons: b
        .trim()
        .split(/\s+/)
        .map((token) => {
          return (token.match(/\d+/g) ?? []).map(Number);
        }),
      joltage: (c.match(/-?\d+/g) ?? []).map(Number),
    };
  });
}
