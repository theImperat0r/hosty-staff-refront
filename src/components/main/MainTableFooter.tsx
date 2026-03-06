import ChevronLeft from "../../assets/ChevronLeft";
import ChevronRight from "../../assets/ChevronRight";

const MainTableFooter = ({
  start = 1,
  end = 0,
  total = 0,
  page = 1,
  totalPages = 1,
  onPageChange,
}: {
  start?: number;
  end?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}) => {
  return (
    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
      <span className="text-xs text-gray-500">
        {total > 0
          ? `Showing ${start}-${end} of ${total} requests`
          : "No requests"}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={page <= 1}
          className="size-8 rounded flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages}
          className="size-8 rounded flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MainTableFooter;
