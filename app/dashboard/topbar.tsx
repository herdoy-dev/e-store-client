import NavUser from "@/components/nav-user";

const Topbar = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NavUser />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
