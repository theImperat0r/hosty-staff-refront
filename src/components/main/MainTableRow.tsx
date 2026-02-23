import MainTableRowButtons from "./MainTableRowButtons";

type TableRowProps = {
  id: string;
  roomNumber: string;
  roomType: string;
  requestPriority: string;
  requestTitle: string;
  requestDescription: string;
  timeRemaining: string;
  submittedAgo: string;
  status: string;
  onRefresh?: () => void;
};

const MainTableRow = ({
  id,
  roomNumber,
  roomType,
  requestPriority,
  requestTitle,
  requestDescription,
  timeRemaining,
  submittedAgo,
  status,
  onRefresh,
}: TableRowProps) => {
  return (
    <tr className="group hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="font-medium text-gray-900">{roomNumber}</div>
        <div className="text-xs text-gray-500">{roomType}</div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-start gap-2">
          {requestPriority == "high" && (
            <span className="mt-0.5 size-2 rounded-full bg-red-500 shrink-0"></span>
          )}
          <div>
            <div className="text-sm text-gray-900 font-medium">
              {requestTitle}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {requestDescription}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="text-sm font-medium text-orange-600">
          {timeRemaining}
        </span>
      </td>
      <td className="py-4 px-6">
        <span className="text-sm font-medium text-red-600">{submittedAgo}</span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${status == "New" || status == "Assigned" ? "text-[#c5a667] bg-[#c5a66733] border-[#c5a66733]" : status == "Completed" ? "text-[#15803d] bg-[#f0fdf4] border-[#bbf7d0]" : "bg-blue-100 text-blue-700 border border-blue-200"}`}
        >
          {status}
        </span>
      </td>
      <td className="py-4 px-6">
        <MainTableRowButtons id={id} status={status} onRefresh={onRefresh} />
      </td>
    </tr>
  );
};

export default MainTableRow;
