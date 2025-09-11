import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Separator } from "../components/ui";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <section className="flex items-stretch">
      <Sidebar />

      <Separator orientation="vertical" />

      <section className="flex flex-col gap-5 w-full px-5">
        <Navbar />

        <section>
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default MainLayout;
