import { useState, useRef, useEffect, type JSX } from "react";

const MainFilterButton = ({
  title,
  label,
  icon,
  options,
  onSelect,
}: {
  title: string;
  label: string;
  icon: JSX.Element;
  options?: string[];
  onSelect?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => options && setOpen(!open)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 gap-2 text-gray-500 hover:text-gray-900 hover:bg-white"
      >
        {title}: <span className="font-medium text-gray-900">{label}</span>
        {icon}
      </button>
      {open && options && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px] py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect?.(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                opt === label ? "text-[#c5a667] font-medium" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainFilterButton;
