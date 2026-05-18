import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="flex h-full min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
