import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { IonIcon } from "@ionic/react";
import { logoGithub } from "ionicons/icons";

const Dashboard = () => {
  return (
    <div className="relative p-2 grid grid-rows-[max-content_5fr]  grid-cols-1 gap-2">
      <Navbar />
      <div className="px-2 py-3">
        <Outlet />
      </div>
      <footer className="-m-2 mt-4 bg-neutral-800 p-3 flex justify-center items-center gap-2">
        <div>
          <div className="flex gap-1 text-sm font-normal text-neutral-200">
            Developed by
            <a
              className="hover:text-neutral-50"
              href="https://www.linkedin.com/in/vaseem-ahamed-va/"
            >
              Vaseem Ahamed
            </a>
          </div>
        </div>
        <a className="flex items-center" href="https://github.com/vaseemGit7">
          <IonIcon
            icon={logoGithub}
            className="text-xl text-neutral-200 hover:text-neutral-50"
          ></IonIcon>
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
