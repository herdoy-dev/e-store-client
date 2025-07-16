import NavUser from "@/components/nav-user";
import { MobileAside } from "./mobile-aside";

const Topbar = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between lg:justify-end px-4">
        <MobileAside />
        <div className="flex items-center gap-4">
          <NavUser />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
