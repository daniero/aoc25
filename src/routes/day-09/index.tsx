import { createFileRoute } from '@tanstack/react-router';
import { Day9 } from './-solution/day9.tsx';

export const Route = createFileRoute('/day-09/')({
  component: Day9,
});
