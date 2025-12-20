import { clsx } from 'clsx/lite';
import { Link } from '@tanstack/react-router';

const days = [
  { n: 1, href: '/day-01', done: 0 },
  { n: 2, href: '/day-02', done: 0 },
  { n: 3, href: '/day-03', done: 0 },
  { n: 4, href: '/day-04', done: 1 },
  { n: 5, href: '/day-05', done: 0 },
  { n: 6, href: '/day-06', done: 0 },
  { n: 7, href: '/day-07', done: 0 },
  { n: 8, href: '/day-08', done: 0 },
  { n: 9, href: '/day-09', done: 1 },
  { n: 10, href: '/day-10', done: 1 },
  { n: 11, href: '/day-11', done: 0 },
  { n: 12, href: '/day-12', done: 0 },
] as const;

export function Nav() {
  const dayStyle = clsx(
    'inline-block p-2.5 rounded-4xl text-center text-[1em]/2',
  );

  return (
    <nav className="text-white">
      <ul className="flex gap-0 -ml-2">
        {days.map(({ n, href, done }) => (
          <li key={href}>
            {done !== 0 ? (
              <Link
                to={href}
                className={clsx(
                  'triangle',
                  dayStyle,
                  'hover:bg-red-800 hover:outline-4 hover:outline-red-700',
                )}
              >
                {n}
              </Link>
            ) : (
              <span className={clsx(dayStyle, 'opacity-40')}>{n}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
