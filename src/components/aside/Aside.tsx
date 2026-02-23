import AsideFooter from "./AsideFooter";
import AsideHeader from "./AsideHeader";
import AsideNav from "./AsideNav";

const Aside = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-full shrink-0 z-20">
      <AsideHeader />
      <AsideNav />
      <AsideFooter />
    </aside>
  );
};

export default Aside;
