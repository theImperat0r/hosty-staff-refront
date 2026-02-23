import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "../lib/api";

type Shift = {
  id: string;
  dayOfWeek: number;
  shiftStarts: string;
  shiftEnds: string;
};




type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string | null;
  position: "SUPERVISOR" | "STAFF";
  isOnShift: boolean;
  currentShiftStartedAt: string | null;
  departmentId: string | null;
  hotelId: string | null;
  department: { id: string; name: string } | null;
  hotel: { id: string; name: string } | null;
  shifts: Shift[];
};



type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    inviteToken?: string;
  }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await api.get<User>("/auth/me");
      setUser(userData);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const register = async (data: {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    inviteToken?: string;
  }) => {
    const res = await api.post<{ token: string; user: User }>(
      "/auth/register",
      data
    );
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}




// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export type { User, Shift };
