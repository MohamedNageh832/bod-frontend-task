import { Home, UtensilsCrossed } from "lucide-react";
import { ROUTES } from "../constants";

const UseNavigationLinks = () => {
  return [
    {
      icon: <Home />,
      label: "Home",
      url: ROUTES.home.ui.root,
    },
    {
      icon: <UtensilsCrossed />,
      label: "Recipes",
      url: ROUTES.recipes.ui.root,
    },
  ];
};

export default UseNavigationLinks;
