import { clsx } from 'clsx/lite';

const days = [
  { day: 1, done: true },
  { day: 2, done: true },
  { day: 3, done: true },
  { day: 4, done: true },
  { day: 5, done: true },
  { day: 6, done: true },
  { day: 7, done: false },
  { day: 8, done: false },
  { day: 9, done: false },
  { day: 10, done: false },
  { day: 11, done: false },
  { day: 12, done: false },
];

export function Nav() {
  return (
    <nav className="text-white">
      <ul className="flex gap-0">
        {days.map(({ day, done }) => (
          <li key={day}>
            <a
              className={clsx(
                'inline-block p-2.5 rounded-4xl text-center text-[1em]/2',
                'hover:bg-red-800 hover:outline-4 hover:outline-red-700',
                !done && 'opacity-35',
              )}
              href={`/${day.toString()}`}
            >
              {day}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
