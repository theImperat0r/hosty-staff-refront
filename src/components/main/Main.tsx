import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";

const Main = () => {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden">
      <MainNav />
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
