import { useState } from "react";
import MainSettingTitle from "./MainSettingTitle";
import { api } from "../../lib/api";
import toast from "react-hot-toast";

const MainSettingsPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (!currentPassword || !newPassword) {
      toast.error("შეავსეთ ყველა ველი");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("ახალი პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("პაროლები არ ემთხვევა");
      return;
    }

    setLoading(true);
    try {
      await api.put("/user/password", { currentPassword, newPassword });
      toast.success("პაროლი წარმატებით შეიცვალა!");
      e.currentTarget.reset();
    } catch (err: any) {
      toast.error(err.message || "შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#dcdfe5] bg-white text-[#0f1729] shadow-sm">
      <MainSettingTitle
        icon={
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
            className="lucide lucide-lock h-5 w-5"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        }
        title={"პაროლის შეცვლა"}
        description={"განაახლეთ თქვენი პაროლი"}
      />
      <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="currentPassword"
          >
            მიმდინარე პაროლი
          </label>
          <input
            className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 md:text-sm"
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="••••••••"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="newPassword"
            >
              ახალი პაროლი
            </label>
            <input
              className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 md:text-sm"
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="მინიმუმ 6 სიმბოლო"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="confirmPassword"
            >
              გაიმეორეთ ახალი პაროლი
            </label>
            <input
              className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 md:text-sm"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-[#eee8dd] shadow-sm hover:shadow-md h-10 px-4 py-2 bg-[#c5a667] hover:bg-[#b09358]"
        >
          {loading ? "იტვირთება..." : "პაროლის შეცვლა"}
        </button>
      </form>
    </div>
  );
};

export default MainSettingsPassword;
