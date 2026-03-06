import { useTranslation } from "react-i18next";
import MainSettingPrivateInfo from "../components/main/MainSettingPrivateInfo";
import MainSettingsPassword from "../components/main/MainSettingsPassword";
import MainSettingsPosition from "../components/main/MainSettingsPosition";
import MainSettingsShifts from "../components/main/MainSettingsShifts";
import MainTitle from "../components/main/MainTitle";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <MainTitle
        department={
          user?.department?.name || t("settings.breadcrumb.notSpecified")
        }
        page={t("settings.breadcrumb.settings")}
        title={t("settings.header.title")}
        description={t("settings.header.subtitle")}
      />
      <MainSettingPrivateInfo />
      <MainSettingsPosition />
      <MainSettingsShifts />
      <MainSettingsPassword />
    </div>
  );
};

export default Settings;
