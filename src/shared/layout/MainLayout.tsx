import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Separator } from "../components/ui";

const MainLayout = () => {
  return (
    <section className="flex items-stretch">
      <Sidebar />

      <Separator orientation="vertical" />

      <section className="p-5 w-full">
        <Outlet />
      </section>
    </section>
  );
};

export default MainLayout;
