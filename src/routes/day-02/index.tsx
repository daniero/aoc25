import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/day-02/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2>Day 2</h2>
      <div>TODO</div>
    </>
  );
}
