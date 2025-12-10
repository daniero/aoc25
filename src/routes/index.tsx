import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl">Hello there!</h2>
      <p>
        In case you are confused – these pages are solutions to this year's{' '}
        <a
          className="text-red-800 hover:underline"
          href="https://adventofcode.com"
        >
          Advent of Code
        </a>{' '}
        :)
      </p>
      <p>
        This page's marvellous source is available code over at{' '}
        <a
          className="text-red-800 hover:underline"
          href="https://github.com/daniero/aoc25"
        >
          GitHub
        </a>
        !
      </p>
    </div>
  );
}
