import { dispatch } from "@/store";
import { globalSearchActions } from "../store";

export const updateQuery = (q: string) => {
  dispatch(globalSearchActions.updateQuery(q));
};
