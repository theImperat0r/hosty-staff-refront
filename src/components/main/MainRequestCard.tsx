import type { JSX } from "react";

const MainRequestCard = ({
  icon,
  title,
  quantity,
  id,
}: {
  icon: JSX.Element;
  title: string;
  quantity: number | string;
  id: number;
}) => {
  const iconColors: Record<number, string> = {
    1: "bg-[#c5a667]/10 text-[#c5a667]",
    2: "bg-[#eff6ff] text-[#2563eb]",
    3: "bg-[#f0fdf4] text-[#16a34a]",
    4: "bg-[#fef2f2] text-[#dc2626]",
    5: "bg-[#faf5ff] text-[#9333ea]",
  };

  const cardIconColor = iconColors[id];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4">
        <div
          className={`size-12 rounded-lg flex items-center justify-center ${cardIconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default MainRequestCard;
