import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";

type Notification = {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

type SearchResult = {
  requests: { id: string; title: string; room: { number: string } }[];
  rooms: { id: string; number: string; type: string }[];
};

const MainNav = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    api
      .get<Notification[]>("/notifications")
      .then(setNotifications)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setShowSearch(false);
      return;
    }
    const timeout = setTimeout(() => {
      api
        .get<SearchResult>(`/search?q=${encodeURIComponent(searchQuery)}`)
        .then((res) => {
          setSearchResults(res);
          setShowSearch(true);
        })
        .catch(() => {});
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
    }
  };

  return (
    <nav className="shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div ref={searchRef} className="relative">
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
            className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="h-9 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a667] focus-visible:ring-offset-2"
            placeholder="Search requests, rooms..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showSearch && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.requests.length === 0 &&
              searchResults.rooms.length === 0 ? (
                <div className="p-4 text-sm text-gray-400 text-center">
                  არაფერი მოიძებნა
                </div>
              ) : (
                <>
                  {searchResults.requests.map((r) => (
                    <div
                      key={r.id}
                      className="px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      <span className="font-medium">{r.title}</span>
                      <span className="text-gray-400 ml-2">
                        Room {r.room.number}
                      </span>
                    </div>
                  ))}
                  {searchResults.rooms.map((r) => (
                    <div
                      key={r.id}
                      className="px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      <span className="font-medium">Room {r.number}</span>
                      <span className="text-gray-400 ml-2">{r.type}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
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
              className="lucide lucide-bell h-5 w-5 text-gray-500"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold h-4 min-w-4 flex items-center justify-center rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-gray-100 font-medium text-sm">
                შეტყობინებები
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-sm text-gray-400 text-center">
                  შეტყობინებები არ არის
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => !n.isRead && markAsRead(n.id)}
                    className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer text-sm ${
                      !n.isRead ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.isRead && (
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                      <p className="text-gray-700">{n.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#c5a667]/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#c5a667]">
              {user?.name?.[0] || "U"}
              {user?.lastName?.[0] || ""}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || ""} {user?.lastName || ""}
            </p>
            <p className="text-xs text-gray-500">
              {user?.position === "SUPERVISOR"
                ? "სუპერვაიზერი"
                : "პერსონალი"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
