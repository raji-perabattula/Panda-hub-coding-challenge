import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";

export default function HomePage() {
  return (
<div className="flex h-screen main-layout">
  {/* Sidebar - Fixed Width */}
  <div className="flex-shrink-0" >
    <Sidebar />
  </div>
  

  {/* Right Side - Stretches */}
  <div className="flex flex-col flex-1 overflow-hidden">
    {/* Header - Auto height */}
    <Header />

    {/* Main Container - Fills remaining height */}
    <main className="flex-1 overflow-y-auto px-6">
      <Dashboard />
    </main>
  </div>
</div>
  );
}
