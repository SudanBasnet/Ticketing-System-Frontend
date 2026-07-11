import Sidebar from "../components/Layout/Sidebar";
import Topbar from "../components/Layout/Topbar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell flex h-screen bg-base-200 text-base-content transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
