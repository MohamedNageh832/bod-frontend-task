import { apiSecureGet } from "@/shared/api";
import { ROUTES } from "@/shared/constants";
import type { User } from "../validation";

export const fetchCurrentUser = () => apiSecureGet<User>(ROUTES.auth.api.me);
