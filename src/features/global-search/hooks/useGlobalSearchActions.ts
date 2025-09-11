import { useDispatch } from "react-redux";
import { globalSearchActions } from "../slice";
import { executeSearch } from "../thunks";
import type { AppDispatch } from "@/store";
import { useMemo } from "react";

const UseGlobalSearchActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(
    () => ({
      updateQuery: (q: string) => dispatch(globalSearchActions.updateQuery(q)),
      executeSearch: (q: string) => dispatch(executeSearch(q)),
    }),
    [dispatch]
  );
};

export default UseGlobalSearchActions;
