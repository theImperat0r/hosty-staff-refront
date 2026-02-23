import { useState, useEffect, useCallback } from "react";
import MainDashboardBlur from "../components/main/MainDashboardBlur";
import MainFilterButton from "../components/main/MainFilterButton";
import MainRequestCard from "../components/main/MainRequestCard";
import MainTable from "../components/main/MainTable";
import MainTitle from "../components/main/MainTitle";
import { FILTER_BUTTONS } from "../constants/filterButtons";
import { DASHBOARD_TABLE_HEADER } from "../constants/tableHeader";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { timeAgo, slaRemaining, formatStatus } from "../lib/utils";
import type { TableRequestRowItem } from "../constants/tableRequest";
import { DASHBOARD_REQUESTS } from "../constants/requests";

type Summary = {
  newRequests: number;
  inProgress: number;
  completedToday: number;
  urgent: number;
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

type RequestsResponse = {
  data: ApiRequest[];
  total: number;
  page: number;
  pageSize: number;
};

const Home = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<Summary>({
    newRequests: 0,
    inProgress: 0,
    completedToday: 0,
    urgent: 0,
  });
  const [requests, setRequests] = useState<TableRequestRowItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchData = useCallback(async () => {
    try {
      const [sum, reqRes] = await Promise.all([
        api.get<Summary>("/dashboard/summary"),
        api.get<RequestsResponse>(
          `/dashboard/requests?page=${page}&pageSize=10&status=${statusFilter}&priority=${priorityFilter}`
        ),
      ]);
      setSummary(sum);
      setTotal(reqRes.total);
      setRequests(
        reqRes.data.map((r) => ({
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
    if (user?.isOnShift) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
  }, [fetchData, user?.isOnShift]);

  const summaryCards = DASHBOARD_REQUESTS.map((r) => ({
    ...r,
    quantity:
      r.id === 1
        ? summary.newRequests
        : r.id === 2
          ? summary.inProgress
          : r.id === 3
            ? summary.completedToday
            : summary.urgent,
  }));

  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <MainTitle
        department={user?.department?.name || "Housekeeping Department"}
        page={"Requests"}
        title={"My Department"}
        description={"Only housekeeping department requests"}
      />
      <div className="relative">
        {!user?.isOnShift && <MainDashboardBlur onRefresh={fetchData} />}
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
                  ? ["All", "New", "In Progress", "Completed", "Paused"]
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
          tableData={DASHBOARD_TABLE_HEADER}
          tableRowData={requests}
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={setPage}
          onRefresh={fetchData}
        />
      </div>
    </div>
  );
};

export default Home;
