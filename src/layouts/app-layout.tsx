import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="bg-bg-primary min-h-dvh">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
