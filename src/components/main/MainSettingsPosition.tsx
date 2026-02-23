import MainSettingTitle from "./MainSettingTitle";
import { useAuth } from "../../context/AuthContext";

const POSITION_LABELS: Record<string, string> = {
  SUPERVISOR: "სუპერვაიზერი",
  STAFF: "პერსონალი",
};

const MainSettingsPosition = () => {
  const { user } = useAuth();

  const positionsInfo = [
    {
      id: 1,
      icon: (
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
          className="lucide lucide-building2 h-8 w-8 text-muted-foreground"
        >
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
          <path d="M10 6h4"></path>
          <path d="M10 10h4"></path>
          <path d="M10 14h4"></path>
          <path d="M10 18h4"></path>
        </svg>
      ),
      title: "სასტუმრო",
      description: user?.hotel?.name || "არ არის მითითებული",
    },
    {
      id: 2,
      icon: (
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
          className="lucide lucide-briefcase h-8 w-8 text-muted-foreground"
        >
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          <rect width="20" height="14" x="2" y="6" rx="2"></rect>
        </svg>
      ),
      title: "დეპარტამენტი",
      description: user?.department?.name || "არ არის მითითებული",
    },
    {
      id: 3,
      icon: (
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
          className="lucide lucide-user h-8 w-8 text-muted-foreground"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "როლი",
      description: POSITION_LABELS[user?.position || ""] || "არ არის მითითებული",
    },
  ];

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
            className="lucide lucide-building2 h-5 w-5"
          >
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
            <path d="M10 6h4"></path>
            <path d="M10 10h4"></path>
            <path d="M10 14h4"></path>
            <path d="M10 18h4"></path>
          </svg>
        }
        title={"პოზიცია"}
        description={"თქვენი პოზიცია ორგანიზაციაში"}
      />
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {positionsInfo.map((pi) => (
            <div
              key={pi.id}
              className="flex items-center gap-3 p-4 bg-[#e8eaee80] rounded-lg"
            >
              {pi.icon}
              <div>
                <p className="text-sm text-[#676f7e]">{pi.title}</p>
                <p className="font-medium">{pi.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSettingsPosition;
