import StarIcon from "../../assets/StarIcon";

const AsideHeader = () => {
  return (
    <div className="p-6 flex items-center gap-3 mb-2">
      <div className="bg-[#c5a667]/20 flex items-center justify-center rounded-lg size-10 text-[#c5a667]">
        <StarIcon />
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
