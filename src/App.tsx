import Aside from "./components/aside/Aside";
import Main from "./components/main/Main";

const App = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f3f3]">
      <Aside />
      <Main />
    </div>
  );
};

export default App;
