import { type ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import { Pagination } from "@/shared/components/wrappers";
import { cn } from "@/shared/utils";

import {
  selectRecipes,
  selectSearch,
  selectStatus,
  selectTotalRecipesCount,
  selectVisibleColumns,
} from "../store";
import { TABLE_COLUMNS } from "../constants";
import { useRecipeQueryParams, UseRecipeSearch } from "../hooks";
import RecipeTableCell from "./RecipeTableCell";
import EmptyTableMessage from "./EmptyTableMessage";
import RecipeTableControls from "./RecipeTableControls";

const RecipeTable = () => {
  const search = useSelector(selectSearch);
  const visibleColumns = useSelector(selectVisibleColumns);
  const status = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const totalRecipesCount = useSelector(selectTotalRecipesCount);

  const { q, limit, page, updateSearchParams } = useRecipeQueryParams();
  const hasSearch = q && q.length > 0;
  UseRecipeSearch();

  const visibleRecipes = hasSearch ? search.results : recipes;
  const totalRecipes = hasSearch ? search.totalResults : totalRecipesCount;
  const totalPages = Math.ceil(totalRecipes / limit);

  const handlePagination = (currentPage: number) => {
    updateSearchParams({ page: `${currentPage}` });
  };

  const handleRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ limit: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4 pb-5">
      <section
        className={cn(
          "relative max-h-[65vh] rounded-lg border",
          status.loadRecipes === "loading" ? "overflow-hidden" : "overflow-auto"
        )}
      >
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              {visibleColumns.map((c) => (
                <TableHead key={`recipe-th-${c}`}>
                  {TABLE_COLUMNS[c].text}
                </TableHead>
              ))}
              <TableHead>Controls</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleRecipes.length === 0 && <EmptyTableMessage />}
            {visibleRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                {visibleColumns.map((c) => (
                  <RecipeTableCell
                    data={recipe}
                    column={c}
                    key={`recipe-${c}-${recipe.id}`}
                  />
                ))}

                <TableCell>
                  <RecipeTableControls />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {(status.loadRecipes === "loading" ||
          status.searchRecipes === "loading") && (
          <section className="absolute top-0 flex-center gap-2 bg-secondary/50 w-full h-full">
            <Loader2 className="text-brand animate-spin" size={30} />
            {status.searchRecipes === "loading" ? (
              <p>Searching...</p>
            ) : (
              <p>Fetching Recipes...</p>
            )}
          </section>
        )}
      </section>

      <footer className="flex justify-around items-center gap-3 w-full">
        {totalPages > 1 && (
          <Pagination
            value={page}
            onChange={handlePagination}
            totalPages={totalPages}
          />
        )}

        <section className={cn("flex items-center gap-2")}>
          Rows per page
          <Input
            className="w-[100px]"
            value={limit}
            type="number"
            onChange={handleRowsPerPage}
          />
        </section>
      </footer>
    </section>
  );
};

export default RecipeTable;
