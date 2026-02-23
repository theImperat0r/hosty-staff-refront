import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

const AsideNav = () => {
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    api
      .get<{ assigned: number; inProgress: number }>("/my-tasks/summary")
      .then((s) => setTaskCount(s.assigned + s.inProgress))
      .catch(() => {});
  }, []);
  const baseClasses =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group";

  const activeClasses = "bg-[#c5a667]/10 text-[#c5a667]";
  const inactiveClasses = "text-gray-500 hover:bg-gray-50";
  return (
    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-layout-dashboard w-5.5 h-5.5 transition-colors group-hover:text-[#c5a667]"
        >
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
        <span className="text-sm font-medium">Dashboard</span>
      </NavLink>
      <NavLink
        to={"/my-tasks"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-clipboard-list w-5.5 h-5.5 transition-colors group-hover:text-[#c5a667]"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <path d="M12 11h4"></path>
          <path d="M12 16h4"></path>
          <path d="M8 11h.01"></path>
          <path d="M8 16h.01"></path>
        </svg>
        <span className="text-sm font-semibold">My Tasks</span>
        {taskCount > 0 && (
          <span className="ml-auto bg-[#c5a667] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {taskCount}
          </span>
        )}
      </NavLink>
      <NavLink
        to={"/team"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users w-5.5 h-5.5 transition-colors group-hover:text-[#c5a667]"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span className="font-DM text-sm font-medium">გუნდი</span>
      </NavLink>
    </nav>
  );
};

export default AsideNav;
