import { Home } from "lucide-react";
import { ROUTES } from "../constants";

const UseNavigationLinks = () => {
  return [
    {
      icon: <Home />,
      label: "Home",
      url: ROUTES.home.ui.root,
    },
  ];
};

export default UseNavigationLinks;
