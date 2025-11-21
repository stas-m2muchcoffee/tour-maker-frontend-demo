import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="bg-bg-primary">
      <div className="w-full min-h-dvh max-w-7xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
