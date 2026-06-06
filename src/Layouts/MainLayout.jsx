import Sidebar from "../components/Layout/Sidebar";
import Topbar from "../components/Layout/Topbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
