import { createRoot } from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>,
);
