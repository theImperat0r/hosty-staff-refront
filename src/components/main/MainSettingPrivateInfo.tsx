import { useState } from "react";
import MainSettingTitle from "./MainSettingTitle";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import toast from "react-hot-toast";
import type { User } from "../../context/AuthContext";
import UserIcon from "../../assets/UserIcon";
import { useTranslation } from "react-i18next";
import SaveIcon from "../../assets/SaveIcon";

const MainSettingPrivateInfo = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const lastName = form.get("lastName") as string;
    const phone = form.get("phone") as string;

    setLoading(true);
    try {
      const updated = await api.put<User>("/user/profile", {
        name,
        lastName,
        phone: phone || null,
      });
      setUser((prev) => (prev ? { ...prev, ...updated } : prev));
      toast.success("პროფილი განახლდა!");
    } catch (err: any) {
      toast.error(err.message || "შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#dcdfe5] bg-white text-[#0f1729] shadow-sm">
      <MainSettingTitle
        icon={<UserIcon />}
        title={t("settings.personalInfo.title")}
        description={t("settings.personalInfo.description")}
      />
      <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              {t("settings.personalInfo.fields.firstName.label")}
            </label>
            <input
              defaultValue={user?.name || ""}
              placeholder="გიორგი"
              id="name"
              name="name"
              type="text"
              className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="lastName"
            >
              {t("settings.personalInfo.fields.lastName.label")}
            </label>
            <input
              defaultValue={user?.lastName || ""}
              placeholder="გიორგაძე"
              id="lastName"
              name="lastName"
              type="text"
              className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="phone"
          >
            {t("settings.personalInfo.fields.phone.label")}
          </label>
          <input
            className="mt-2 flex h-10 w-full rounded-md border border-[#dcdfe5] bg-[#f6f7f9] px-3 py-2 text-base ring-[#f6f7f9] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676f7e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            type="text"
            name="phone"
            id="phone"
            defaultValue={user?.phone || ""}
            placeholder="+995 555 12 34 56"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-[#f6f7f9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a65e] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-[#eee8dd] shadow-sm hover:shadow-md h-10 px-4 py-2 bg-[#c5a667] hover:bg-[#b09358]"
        >
          <SaveIcon />
          {loading
            ? t("common.loading")
            : t("settings.personalInfo.actions.save")}
        </button>
      </form>
    </div>
  );
};

export default MainSettingPrivateInfo;
