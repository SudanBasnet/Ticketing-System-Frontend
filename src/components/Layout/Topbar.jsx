import { FiBell } from "react-icons/fi";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-5">
        <FiBell size={20} />

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500"></div>

          <div>
            <p className="font-medium">Sudan Basnet</p>

            <p className="text-sm text-gray-500">Service Desk Agent</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
