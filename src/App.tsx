import { Header } from './components/Header.tsx';
import { Nav } from './components/Nav.tsx';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="banner">
        <div className="w-full max-w-5xl m-auto pt-2 px-5 pb-3">
          <Header />
          <Nav />
        </div>
      </div>
      <div className="flex-1 pt-2 pb-3 bg-orange-100">
        <div className="w-full max-w-5xl m-auto mt-7 text-xl px-5">
          Hello there!
        </div>
      </div>
    </div>
  );
}
