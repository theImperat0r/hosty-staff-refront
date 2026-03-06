import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { useTranslation } from "react-i18next";
import DashboardIcon from "../../assets/DashboardIcon";
import MytasksIcon from "../../assets/MytasksIcon";
import TeamIcon from "../../assets/TeamIcon";

const AsideNav = () => {
  const [taskCount, setTaskCount] = useState(0);
  const { t } = useTranslation();

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
        to={"/staff"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <DashboardIcon />
        <span className="text-sm font-medium">{t("navigation.dashboard")}</span>
      </NavLink>
      <NavLink
        to={"/staff/my-tasks"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <MytasksIcon />
        <span className="text-sm font-semibold">{t("navigation.myTasks")}</span>
        {taskCount > 0 && (
          <span className="ml-auto bg-[#c5a667] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {taskCount}
          </span>
        )}
      </NavLink>
      <NavLink
        to={"/staff/team"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <TeamIcon />
        <span className="font-DM text-sm font-medium">
          {t("navigation.team")}
        </span>
      </NavLink>
    </nav>
  );
};

export default AsideNav;
