import type { JSX } from "react";

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
            className="lucide lucide-calendar h-4 w-4 text-gray-400"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
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
                  className="lucide lucide-clock h-3.5 w-3.5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
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
