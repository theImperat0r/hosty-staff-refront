import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || !password) {
      toast.error("შეავსეთ ყველა ველი");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/staff", { replace: true });
    } catch (err: unknown) {
      toast.error((err instanceof Error ? err.message : String(err)) || "შესვლა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e] px-4">
      <Toaster position="bottom-right" />
      <div className="font-DM rounded-lg border text-[#0f1729] shadow-sm w-full max-w-md bg-[#232938] border-[#2d3548]">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#c5a667]/20 flex items-center justify-center">
            <span className="text-[#c5a667] text-xl font-bold">E</span>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-white tracking-wide">
            EPISODE
          </h3>
          <p className="text-sm mt-2 text-gray-400">პერსონალის პორტალი</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                htmlFor="email"
              >
                ელფოსტა
              </label>
              <input
                className="mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-[#f6f7f9] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1a1f2e] border-[#2d3548] text-white placeholder:text-gray-500 focus:border-[#c5a667] focus:ring-[#c5a667]"
                placeholder="email@example.com"
                type="text"
                id="email"
                name="email"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                htmlFor="password"
              >
                პაროლი
              </label>
              <input
                className="mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-[#f6f7f9] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1a1f2e] border-[#2d3548] text-white placeholder:text-gray-500 focus:border-[#c5a667] focus:ring-[#c5a667]"
                placeholder="••••••••"
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm ring-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md h-10 px-4 py-2 w-full bg-[#c5a667] hover:bg-[#b09358] text-[#1a1f2e] font-semibold"
            >
              {loading ? "იტვირთება..." : "შესვლა"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
