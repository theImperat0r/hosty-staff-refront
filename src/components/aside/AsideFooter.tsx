import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SettingsIcon from "../../assets/SettingsIcon";
import SignOutIcon from "../../assets/SignOutIcon";
import { useTranslation } from "react-i18next";

const AsideFooter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="p-4 mt-auto border-t border-gray-200">
      <Link
        to={"/staff/settings"}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-gray-500 hover:bg-gray-50"
      >
        <SettingsIcon />
        <span className="text-sm font-medium">{t("navigation.settings")}</span>
      </Link>

      <button
        onClick={handleLogout}
        className="cursor-pointer mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors group"
      >
        <SignOutIcon />
        <span className="text-sm font-medium">{t("navigation.signOut")}</span>
      </button>
    </div>
  );
};

export default AsideFooter;
