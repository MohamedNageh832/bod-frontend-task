import { store } from "@/store";
import { globalSearchActions } from "../store";

export const updateQuery = (q: string) => {
  store.dispatch(globalSearchActions.updateQuery(q));
};
