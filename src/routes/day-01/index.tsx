import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/day-01/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <h2>Day 1</h2>;
}
