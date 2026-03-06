import type { JSX } from "react";
import CalendarLucideIcon from "../../assets/CalendarLucideIcon";
import ClockLucideIcon from "../../assets/ClockLucideIcon";

type TeamMembersProps = {
  avatar: JSX.Element;
  name: string;
  lastName: string;
  position: string;
  isOnShift: boolean;
  shifts: {
    id: string;
    day: string;
    shiftStarts: string;
    shiftEnds: string;
  }[];
};

const MainTeamMembersCard = ({
  avatar,
  name,
  lastName,
  isOnShift,
  shifts,
  position,
}: TeamMembersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          {avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {name + " " + lastName}
          </h3>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
        {isOnShift ? (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700 hover:bg-green-100">
            ცვლაზე
          </div>
        ) : (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#c7a86b] text-[#0f1729] hover:bg-secondary/80">
            არ არის
          </div>
        )}
      </div>
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarLucideIcon />
          <span className="text-sm font-medium text-gray-700">
            მინიჭებული ცვლები
          </span>
        </div>
        <div className="space-y-2">
          {shifts.map((shift) => (
            <div
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
              key={shift.id}
            >
              <span className="text-sm font-medium text-gray-700">
                {shift.day}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <ClockLucideIcon />
                <span>{shift.shiftStarts + "-" + shift.shiftEnds}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainTeamMembersCard;
