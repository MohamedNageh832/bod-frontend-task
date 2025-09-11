import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui";
import { GlobalSearchbar } from "@/features/global-search";

const Navbar = () => {
  return (
    <header className="flex-between gap-4 py-2">
      <GlobalSearchbar />

      <Avatar className="size-[40px]">
        <AvatarImage src="/" alt="User profile image" />
        <AvatarFallback className="p-2">
          <User />
        </AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Navbar;
