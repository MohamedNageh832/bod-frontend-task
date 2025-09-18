import { Input } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";

import { selectErrors, selectSearch, selectStatus } from "../store";
import { type ChangeEvent } from "react";

import VisibleColumnsDropdown from "./VisibleColumnsDropdown";
import { useRecipeQueryParams } from "../hooks";

const RecipeHeader = () => {
  const search = useSelector(selectSearch);
  const status = useSelector(selectStatus);
  const errors = useSelector(selectErrors);
  const { q, updateSearchParams } = useRecipeQueryParams();

  const hasSearch = q.length > 0 && status.searchRecipes === "success";

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ q: e.target.value, page: "1" });
  };

  return (
    <header className="flex flex-col gap-6">
      <section className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <section className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground">
          <Search size={16} />
          <Input
            value={q || ""}
            className="w-[300px] max-w-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search recipes"
            onChange={handleSearch}
          />
        </section>

        <Button className="flex gap-1 items-center">
          <Plus /> Create Recipe
        </Button>

        <VisibleColumnsDropdown />
      </section>

      {hasSearch && <p className="font-bold">{search.totalResults} Results</p>}

      {status.searchRecipes === "error" && (
        <p className="font-bold">{errors.searchRecipes} Results</p>
      )}
    </header>
  );
};

export default RecipeHeader;
