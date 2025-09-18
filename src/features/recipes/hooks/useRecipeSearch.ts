import { useDebounce } from "@/shared/hooks";
import { useEffect } from "react";
import { useRecipeQueryParams } from ".";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";
import { fetchRecipes, searchRecipes } from "../thunks";

const UseRecipeSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { q, limit, page } = useRecipeQueryParams();
  const debouncedQ = useDebounce(q);
  const debouncedLimit = useDebounce(limit);

  useEffect(() => {
    if (debouncedQ.length > 0) {
      dispatch(searchRecipes({ q: debouncedQ, page, limit: debouncedLimit }));
    } else {
      dispatch(fetchRecipes({ page, limit: debouncedLimit }));
    }
  }, [dispatch, debouncedQ, page, debouncedLimit]);
};

export default UseRecipeSearch;
