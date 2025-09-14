import { LogOut, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui";
import { GlobalSearchbar } from "@/features/global-search";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signOut } from "@/features/auth";
import type { AppDispatch } from "@/store";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants";

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(ROUTES.auth.ui.signIn);
  };

  return (
    <header className="flex-between gap-4 py-2">
      <GlobalSearchbar />

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-[40px] border-2">
              <AvatarImage src="/" alt="User profile image" />
              <AvatarFallback className="p-2 hover:bg-muted/50">
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-3 p-4" align="end">
            <section className="flex flex-col gap-1">
              <p className="font-bold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </section>

            <Button
              className="flex items-center gap-2"
              variant="outline"
              onClick={handleSignOut}
            >
              <LogOut /> Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Navbar;
