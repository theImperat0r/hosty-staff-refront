import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import LanguageSwitcher from "../LanguageSwitcher";

type SearchResult = {
  requests: { id: string; title: string; room: { number: string } }[];
  rooms: { id: string; number: string; type: string }[];
};

const MainNav = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
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
        <LanguageSwitcher />

        <div className="h-8 w-px bg-gray-200"></div>

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
              {user?.position === "SUPERVISOR" ? "სუპერვაიზერი" : "პერსონალი"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
