import type { TableDataItem } from "../../constants/tableHeader";
import type { TableRequestRowItem } from "../../constants/tableRequest";
import MainTableFooter from "./MainTableFooter";
import MainTableRow from "./MainTableRow";

const MainTable = ({
  tableData,
  tableRowData,
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
  onRefresh,
}: {
  tableData: TableDataItem[];
  tableRowData: TableRequestRowItem[];
  page?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
}) => {
  const pageSize = 10;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {tableData.map((th) => (
                <th
                  className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-24 last:text-end"
                  key={th.id}
                >
                  {th.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableRowData.length === 0 ? (
              <tr>
                <td
                  colSpan={tableData.length}
                  className="py-12 text-center text-gray-400"
                >
                  მონაცემები არ მოიძებნა
                </td>
              </tr>
            ) : (
              tableRowData.map((trr) => (
                <MainTableRow
                  key={trr.id}
                  id={trr.id}
                  roomNumber={trr.room.number}
                  roomType={trr.room.type}
                  requestPriority={trr.request.priority}
                  requestTitle={trr.request.title}
                  requestDescription={trr.request.description}
                  timeRemaining={trr.timing.timeRemaining}
                  submittedAgo={trr.timing.submittedAgo}
                  status={trr.status}
                  onRefresh={onRefresh}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <MainTableFooter
        start={start}
        end={end}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MainTable;
