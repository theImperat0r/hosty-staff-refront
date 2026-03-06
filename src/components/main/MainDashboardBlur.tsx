import { useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import PlayIcon from "../../assets/PlayIcon";

const MainDashboardBlur = ({ onRefresh }: { onRefresh?: () => void }) => {
  const { setUser, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleStartShift = async () => {
    setLoading(true);
    try {
      await api.post("/shifts/start");
      if (user) {
        setUser({
          ...user,
          isOnShift: true,
          currentShiftStartedAt: new Date().toISOString(),
        });
      }
      onRefresh?.();
      toast.success("ცვლა დაიწყო!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("ცვლის დაწყება ვერ მოხერხდა");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex  justify-center bg-white/60 backdrop-blur-sm rounded-xl">
      <div className="text-center p-8">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[#c5a667]/10 flex items-center justify-center">
          <PlayIcon height={"h-8"} width={"w-8"} color={"text-[#c5a667]"} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ცვლა არ არის დაწყებული
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm">
          რექვესტების სანახავად და სამუშაოდ გთხოვთ დაიწყოთ თქვენი ცვლა
        </p>
        <button
          onClick={handleStartShift}
          disabled={loading}
          className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md h-12 rounded-lg px-6 text-base bg-[#c5a667] hover:bg-[#b09358] text-white gap-2"
        >
          <PlayIcon height={"h-5"} width={"w-5"} />
          {loading ? "იტვირთება..." : "ცვლის დაწყება"}
        </button>
      </div>
    </div>
  );
};

export default MainDashboardBlur;
