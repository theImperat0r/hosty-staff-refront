import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../lib/api";
import PlayTriangleIcon from "../../assets/PlayTriangleIcon";
import EllipsisVerticalIcon from "../../assets/EllipsisVerticalIcon";
import PauseIcon from "../../assets/PauseIcon";
import CircleCheckBigIcon from "../../assets/CircleCheckBigIcon";

const MainTableRowButtons = ({
  id,
  status,
  onRefresh,
}: {
  id: string;
  status: string;
  onRefresh?: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [reportText, setReportText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAction = async (action: "start" | "pause" | "complete") => {
    setActionLoading(true);
    try {
      await api.post(`/requests/${id}/${action}`);
      toast.success(
        action === "start"
          ? "Task started"
          : action === "pause"
            ? "Task paused"
            : "Task completed",
      );
      onRefresh?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Action failed");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await api.post(`/requests/${id}/notes`, { note: noteText });
      toast.success("Note added");
      setNoteText("");
      setNoteModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to add note");
      }
    }
  };

  const handleReport = async () => {
    if (!reportText.trim()) return;
    try {
      await api.post(`/requests/${id}/report`, { issue: reportText });
      toast.success("Issue reported");
      setReportText("");
      setReportModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to report issue");
      }
    }
  };

  return (
    <div ref={menuRef} className="relative flex items-center justify-end gap-2">
      {status === "New" || status === "Assigned" || status === "Paused" ? (
        <>
          <button
            onClick={() => handleAction("start")}
            disabled={actionLoading}
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md h-9 rounded-md px-3 bg-[#c5a667] hover:bg-[#b09358] text-white gap-1"
          >
            <PlayTriangleIcon />
            Start
          </button>
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="cursor-pointer text-gray-400 hover:text-[#c5a667] transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <EllipsisVerticalIcon />
          </button>
        </>
      ) : status === "Completed" ? (
        <span className="text-xs text-gray-400">Completed</span>
      ) : (
        <>
          <button
            onClick={() => handleAction("pause")}
            disabled={actionLoading}
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-[#dcdfe5] bg-[#f6f7f9] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 gap-1"
          >
            <PauseIcon />
          </button>
          <button
            onClick={() => handleAction("complete")}
            disabled={actionLoading}
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md h-9 rounded-md px-3 bg-green-600 hover:bg-green-700 text-white gap-1"
          >
            <CircleCheckBigIcon />
            Complete
          </button>
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="cursor-pointer text-gray-400 hover:text-[#c5a667] transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <EllipsisVerticalIcon />
          </button>
        </>
      )}
      {modalOpen && (
        <div className="absolute top-8 right-0 min-w-2 w-full p-1 bg-white flex flex-col items-start z-50 rounded-md border border-gray-200 shadow-lg">
          <button
            onClick={() => {
              setNoteModalOpen(true);
              setModalOpen(false);
            }}
            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded"
          >
            Add note
          </button>
          <button
            onClick={() => {
              setReportModalOpen(true);
              setModalOpen(false);
            }}
            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded text-red-500"
          >
            Report issue
          </button>
        </div>
      )}
      {noteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Add Note</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#c5a667] focus:outline-none"
              rows={3}
              placeholder="Write your note..."
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setNoteModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 text-sm bg-[#c5a667] text-white rounded-md hover:bg-[#b09358]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-red-600 mb-3">Report Issue</h3>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full border border-gray-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
              rows={3}
              placeholder="Describe the issue..."
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default MainTableRowButtons;
