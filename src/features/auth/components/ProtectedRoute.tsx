import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { selectStatus, selectUser } from "../store";
import { ROUTES } from "@/shared/constants";
import { useEffect } from "react";
import { fetchCurrentUser } from "../thunks";
import type { AppDispatch } from "@/store";

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const isFetched = !["idle", "loading"].includes(status.fetchCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || isFetched) return;
    dispatch(fetchCurrentUser());
  }, [user, dispatch, isFetched]);

  useEffect(() => {
    if (!user && isFetched) navigate(ROUTES.auth.ui.signIn);
  }, [user, navigate, isFetched]);

  return <Outlet />;
};

export default ProtectedRoute;
