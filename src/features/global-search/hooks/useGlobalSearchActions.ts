import { useDispatch } from "react-redux";
import { globalSearchActions } from "../store";
import type { AppDispatch } from "@/store";
import { useMemo } from "react";

const UseGlobalSearchActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(
    () => ({
      updateQuery: (q: string) => dispatch(globalSearchActions.updateQuery(q)),
    }),
    [dispatch]
  );
};

export default UseGlobalSearchActions;
