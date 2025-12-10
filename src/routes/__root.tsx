import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Nav } from '../components/Nav.tsx';
import { Header } from '../components/Header.tsx';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="banner">
        <div className="w-full max-w-lg m-auto pt-2 px-5 pb-3">
          <Header />
          <Nav />
        </div>
      </div>
      <div className="flex-1 pt-2 pb-3 bg-orange-100">
        <div className="w-full max-w-lg m-auto mt-7 text-xl px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
