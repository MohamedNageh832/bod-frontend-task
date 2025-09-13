import { store } from "@/store";
import { thunks } from "../thunks";

export const executeSearch = (q: string) => {
  store.dispatch(thunks.executeSearch(q));
};
