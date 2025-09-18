import { useSearchParams } from "react-router";

const UseRecipeQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const updateSearchParams = (params: Record<string, string>) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  return { q, page, limit, updateSearchParams };
};

export default UseRecipeQueryParams;
