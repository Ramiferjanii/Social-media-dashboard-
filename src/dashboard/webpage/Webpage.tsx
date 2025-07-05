import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Feed } from "../Feed";
import { RightSidebar } from "../RightSideBar";
import { useAuth } from '../auth-context';

export default function Webpage() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>

          <div className="col-span-1 lg:col-span-6">
            <Feed />
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}