import MainSettingTitle from "./MainSettingTitle";
import { useAuth } from "../../context/AuthContext";
import { DAY_NAMES } from "../../lib/utils";
import CalendarIcon from "../../assets/CalendarIcon";
import { useTranslation } from "react-i18next";
import CalendarIconX from "../../assets/CalendarIconX";
import ClockIcon from "../../assets/ClockIcon";

const MainSettingsShifts = () => {
  const { user } = useAuth();
  const shifts = user?.shifts || [];
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-[#dcdfe5] bg-white text-[#0f1729] shadow-sm">
      <MainSettingTitle
        icon={<CalendarIcon />}
        title={t("settings.shifts.title")}
        description={t("settings.shifts.description")}
      />
      <div className="p-6 pt-0">
        {shifts.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            <div className="text-center">
              <CalendarIconX />
              <p>{t("settings.shifts.emptyState.title")}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shifts.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 bg-[#e8eaee80] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <span className="text-sm font-medium">
                    {DAY_NAMES[s.dayOfWeek] || `Day ${s.dayOfWeek}`}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {s.shiftStarts} - {s.shiftEnds}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSettingsShifts;
