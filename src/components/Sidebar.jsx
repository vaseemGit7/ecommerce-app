const Sidebar = ({ isSidebarExpanded, setSidebarExpand }) => {
  return (
    <div
      onMouseEnter={() => setSidebarExpand(true)}
      onMouseLeave={() => setSidebarExpand(false)}
      className=" row-start-1 row-end-3 flex flex-col px-4 py-3 gap-10 text-neutral-100 font-semibold bg-neutral-800 rounded-lg"
    >
      {isSidebarExpanded ? (
        <>
          <div className="flex gap-3 px-2 py-1 text-xl">
            <p>D</p>
            <p>Dashboard</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>H</p>
              <p>Home</p>
            </div>
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>P</p>
              <p>Profile</p>
            </div>
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>M</p>
              <p>Messages</p>
            </div>
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>H</p>
              <p>History</p>
            </div>
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>T</p>
              <p>Tasks</p>
            </div>
            <div className="flex gap-3 px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer">
              <p>C</p>
              <p>Communities</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="px-2 py-1 text-xl">D</p>
          <div className="flex flex-col gap-4">
            <p className="px-2 py-1">H</p>
            <p className="px-2 py-1">P</p>
            <p className="px-2 py-1">M</p>
            <p className="px-2 py-1">H</p>
            <p className="px-2 py-1">T</p>
            <p className="px-2 py-1">C</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
