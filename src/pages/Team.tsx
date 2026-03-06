import { useState, useEffect } from "react";
import MainTeamMembersCard from "../components/main/MainTeamMembersCard";
import MainTitle from "../components/main/MainTitle";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { DAY_NAMES } from "../lib/utils";
import { useTranslation } from "react-i18next";
import CircleUserIcon from "../assets/CircleUserIcon";

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
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get<TeamMember[]>("/team/members")
      .then(setMembers)
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <MainTitle
        department={
          user?.department?.name || "Team" + " " + t("common.department")
        }
        page={t("team.team")}
        title={t("team.title")}
        description={t("team.description")}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((tm) => (
          <MainTeamMembersCard
            key={tm.id}
            avatar={<CircleUserIcon />}
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
