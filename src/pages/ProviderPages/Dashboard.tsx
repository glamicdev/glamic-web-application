import { Calendar } from '../../components/provider/home/Calendar';
import { Sidebar } from '../../components/provider/home/Sidebar';
import { Header } from '../../components/provider/home/Header';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-primary-navy/95">
      {/* Sidebar with separator */}
      <div className="relative">
        <Sidebar />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden pl-16">
        <Header />
        <div className="h-[1px] bg-gray-200 dark:bg-gray-700" /> {/* Separator after header */}
        <main className="flex-1 overflow-x-auto bg-white dark:bg-primary-navy/50">
          <Calendar />
        </main>
      </div>
    </div>
  );
}