import { useState, useEffect, useCallback } from "react";
import MainFilterButton from "../components/main/MainFilterButton";
import MainRequestCard from "../components/main/MainRequestCard";
import MainTable from "../components/main/MainTable";
import MainTitle from "../components/main/MainTitle";
import { FILTER_BUTTONS } from "../constants/filterButtons";
import { MY_TASKS_REQUESTS } from "../constants/requests";
import { MY_TASKS_TABLE_HEADER } from "../constants/tableHeader";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { timeAgo, slaRemaining, formatStatus } from "../lib/utils";
import type { TableRequestRowItem } from "../constants/tableRequest";

type Summary = {
  assigned: number;
  inProgress: number;
  completedToday: number;
  avgTime: string;
};

type ApiRequest = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  submittedAt: string;
  slaMinutes: number;
  room: { number: string; type: string };
};

type TasksResponse = {
  data: ApiRequest[];
  total: number;
  page: number;
  pageSize: number;
};

const MyTasks = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<Summary>({
    assigned: 0,
    inProgress: 0,
    completedToday: 0,
    avgTime: "0m",
  });
  const [tasks, setTasks] = useState<TableRequestRowItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchData = useCallback(async () => {
    try {
      const [sum, tasksRes] = await Promise.all([
        api.get<Summary>("/my-tasks/summary"),
        api.get<TasksResponse>(
          `/my-tasks?page=${page}&pageSize=10&status=${statusFilter}&priority=${priorityFilter}`
        ),
      ]);
      setSummary(sum);
      setTotal(tasksRes.total);
      setTasks(
        tasksRes.data.map((r) => ({
          id: r.id,
          room: { number: r.room.number, type: r.room.type },
          request: {
            title: r.title,
            description: r.description,
            priority: r.priority.toLowerCase(),
          },
          timing: {
            submittedAgo: timeAgo(r.submittedAt),
            timeRemaining: slaRemaining(r.submittedAt, r.slaMinutes),
          },
          status: formatStatus(r.status),
          actions: {
            canPause: r.status === "IN_PROGRESS",
            canComplete: r.status !== "COMPLETED",
            hasMenu: true,
          },
        }))
      );
    } catch {
      void 0;
    }
  }, [page, statusFilter, priorityFilter]);



  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const summaryCards = MY_TASKS_REQUESTS.map((r) => ({
    ...r,
    quantity:
      r.id === 1
        ? summary.assigned
        : r.id === 2
          ? summary.inProgress
          : r.id === 3
            ? summary.completedToday
            : summary.avgTime,
  }));

  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <MainTitle
        department={user?.department?.name || "Housekeeping Department"}
        page={"My Tasks"}
        title={"My Tasks"}
        description={"All tasks assigned to me"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((r) => (
          <MainRequestCard
            key={r.id}
            icon={r.icon}
            title={r.title}
            quantity={r.quantity}
            id={r.id}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 py-2 overflow-x-auto">
        {FILTER_BUTTONS.map((b) => (
          <MainFilterButton
            key={b.id}
            title={b.title}
            label={b.id === 1 ? statusFilter : priorityFilter}
            icon={b.icon}
            options={
              b.id === 1
                ? ["All", "Assigned", "In Progress", "Completed", "Paused"]
                : ["All", "High", "Medium", "Low"]
            }
            onSelect={(val) => {
              if (b.id === 1) setStatusFilter(val);
              else setPriorityFilter(val);
              setPage(1);
            }}
          />
        ))}
      </div>
      <MainTable
        tableData={MY_TASKS_TABLE_HEADER}
        tableRowData={tasks}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
        onRefresh={fetchData}
      />
    </div>
  );
};

export default MyTasks;
