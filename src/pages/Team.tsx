import { useState, useEffect } from "react";
import MainTeamMembersCard from "../components/main/MainTeamMembersCard";
import MainTitle from "../components/main/MainTitle";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { DAY_NAMES } from "../lib/utils";

type TeamMember = {
  id: string;
  name: string;
  lastName: string;
  position: string;
  isOnShift: boolean;
  shifts: {
    id: string;
    dayOfWeek: number;
    shiftStarts: string;
    shiftEnds: string;
  }[];
};

const Team = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    api
      .get<TeamMember[]>("/team/members")
      .then(setMembers)
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <MainTitle
        department={user?.department?.name || "Housekeeping Department"}
        page={"გუნდი"}
        title={"ჩემი გუნდი"}
        description={"თქვენი დეპარტამენტის თანამშრომლები"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((tm) => (
          <MainTeamMembersCard
            key={tm.id}
            avatar={
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
                className="lucide lucide-circle-user h-9 w-9 text-blue-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
              </svg>
            }
            name={tm.name}
            lastName={tm.lastName}
            isOnShift={tm.isOnShift}
            shifts={tm.shifts.map((s) => ({
              id: s.id,
              day: DAY_NAMES[s.dayOfWeek] || `Day ${s.dayOfWeek}`,
              shiftStarts: s.shiftStarts,
              shiftEnds: s.shiftEnds,
            }))}
            position={tm.position}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
