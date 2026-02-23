const AsideHeader = () => {
  return (
    <div className="p-6 flex items-center gap-3 mb-2">
      <div className="bg-[#c5a667]/20 flex items-center justify-center rounded-lg size-10 text-[#c5a667]">
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
          className="lucide lucide-star w-5 h-5 fill-current"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
        </svg>
      </div>
      <div className="flex flex-col">
        <h1 className="text-gray-900 text-lg font-bold leading-tight tracking-tight font-body">
          Hosty
        </h1>
        <p className="text-[#c5a667] text-xs font-medium tracking-wide uppercase">
          Housekeeping
        </p>
      </div>
    </div>
  );
};

export default AsideHeader;
