import * as api from "../../api";
import { validateUser } from "../../validation";

export const fetchCurrentUser = async () => {
  const res = await api.fetchCurrentUser();
  const validation = validateUser(res.data);

  if (!validation.isValid) {
    res.status = "error";
    res.message = res.message || "An error occured. Try again later";
    res.data = undefined;
  }

  return res;
};
