import { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [isSidebarExpanded, setSidebarExpand] = useState(false);

  return (
    <div className="h-full p-2 grid grid-rows-[max-content_5fr]  grid-cols-[max-content_4fr] gap-2">
      <div className="grid px-2 py-3 gap-2">
        <input
          className="row-start-1 row-end-2 place-self-end py-1 px-2 rounded-md bg-neutral-100 hover:drop-shadow-md focus:drop-shadow-md focus:outline-none"
          type="text"
          placeholder="Search..."
        ></input>
        <div className="row-start-1 row-end-2 justify-self-end flex gap-2 text-neutral-900">
          <p>N</p>
          <p>P</p>
        </div>
      </div>
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        setSidebarExpand={setSidebarExpand}
      />
      <div className="grid place-items-center px-2 py-3">
        <div className=" h-96 w-96 bg-neutral-50 rounded-lg drop-shadow-md">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
