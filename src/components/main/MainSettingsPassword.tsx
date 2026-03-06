import { useState } from "react";
import MainSettingTitle from "./MainSettingTitle";
import { api } from "../../lib/api";
import toast from "react-hot-toast";
import LockIcon from "../../assets/LockIcon";
import { useTranslation } from "react-i18next";

const MainSettingsPassword = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("შეცდომა");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#dcdfe5] bg-white text-[#0f1729] shadow-sm">
      <MainSettingTitle
        icon={<LockIcon />}
        title={t("settings.password.title")}
        description={t("settings.password.description")}
      />
      <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="newPassword"
          >
            {t("settings.password.fields.newPassword.label")}
          </label>
          <input
            className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 md:text-sm"
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder={t("settings.password.fields.newPassword.placeholder")}
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="confirmPassword"
          >
            {t("settings.password.fields.confirmPassword.label")}
          </label>
          <input
            className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 md:text-sm"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder={t(
              "settings.password.fields.confirmPassword.placeholder",
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-[#eee8dd] shadow-sm hover:shadow-md h-10 px-4 py-2 bg-[#c5a667] hover:bg-[#b09358]"
        >
          {loading ? t("common.loading") : t("settings.password.title")}
        </button>
      </form>
    </div>
  );
};

export default MainSettingsPassword;
