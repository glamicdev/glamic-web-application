import { Calendar } from "../../../components/provider/home/Calendar";
import { Sidebar } from "../../../components/provider/home/Sidebar";
import { Header } from "../../../components/provider/home/Header";

export default function ProviderHomePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-auto">
          <Calendar />
        </main>
      </div>
    </div>
  );
}
