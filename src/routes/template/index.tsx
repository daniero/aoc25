import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/template/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2>Day X</h2>
      <div>TODO</div>
    </>
  );
}
