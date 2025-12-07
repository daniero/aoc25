import { createFileRoute } from '@tanstack/react-router';
import { DayX } from './-solution/dayX.tsx';

export const Route = createFileRoute('/template/')({
  component: DayX,
});
