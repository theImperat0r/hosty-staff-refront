import MainSettingTitle from "./MainSettingTitle";
import { useAuth } from "../../context/AuthContext";
import { DAY_NAMES } from "../../lib/utils";

const MainSettingsShifts = () => {
  const { user } = useAuth();
  const shifts = user?.shifts || [];

  return (
    <div className="rounded-lg border border-[#dcdfe5] bg-white text-[#0f1729] shadow-sm">
      <MainSettingTitle
        icon={
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
            className="lucide lucide-calendar-range h-5 w-5"
          >
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M16 2v4"></path>
            <path d="M3 10h18"></path>
            <path d="M8 2v4"></path>
            <path d="M17 14h-6"></path>
            <path d="M13 18H7"></path>
            <path d="M7 14h.01"></path>
            <path d="M17 18h.01"></path>
          </svg>
        }
        title={"ცვლები"}
        description={"თქვენი მინიჭებული სამუშაო ცვლები"}
      />
      <div className="p-6 pt-0">
        {shifts.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            <div className="text-center">
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
                className="lucide lucide-calendar-x h-8 w-8 mx-auto mb-3 text-gray-300"
              >
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M16 2v4"></path>
                <path d="M3 10h18"></path>
                <path d="M8 2v4"></path>
                <path d="m14 14-4 4"></path>
                <path d="m10 14 4 4"></path>
              </svg>
              <p>ცვლები ჯერ არ არის მინიჭებული</p>
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
                    className="lucide lucide-clock h-4 w-4 text-[#c5a667]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
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
