import type { JSX } from "react";

const MainSettingTitle = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="text-sm text-[#676f7e]">{description}</p>
    </div>
  );
};

export default MainSettingTitle;
