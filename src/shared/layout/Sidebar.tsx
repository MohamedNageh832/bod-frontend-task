import { NavLink } from "react-router";
import { useNavigationLinks } from "../hooks";
import Logo from "./logo";
import { cn } from "../utils";

const Sidebar = () => {
  const links = useNavigationLinks();

  return (
    <aside className="flex flex-col gap-6 pt-12 px-4 h-screen">
      <Logo />

      <nav className="flex flex-col gap-3 w-[300px] max-w-[90%]">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                "flex gap-3 items-center py-3 px-4 rounded-md hover:bg-brand hover:text-secondary",
                isActive && "bg-brand/10"
              )
            }
            key={link.url}
            to={link.url}
          >
            {link.icon}
            <p>{link.label}</p>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
