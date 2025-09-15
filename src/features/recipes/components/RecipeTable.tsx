import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Trash } from "lucide-react";

import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import type { AppDispatch } from "@/store";
import { cn } from "@/shared/utils";

import {
  selectRecipes,
  selectRowsPerPage,
  selectSearch,
  selectStatus,
  selectTotalRecipeCount,
  selectVisibleColumns,
} from "../store";
import { fetchRecipes } from "../thunks";
import { TABLE_COLUMNS } from "../constants";
import type { Recipe } from "../validation";

const RecipeTable = () => {
  const search = useSelector(selectSearch);
  const visibleColumns = useSelector(selectVisibleColumns);
  const status = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const isActiveSearch =
    search.query.length > 0 && status.searchRecipes === "success";
  const visibleRecipes = isActiveSearch ? search.results : recipes;
  const rowsPerPage = useSelector(selectRowsPerPage);
  const totalRecipeCount = useSelector(selectTotalRecipeCount);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status.loadRecipes === "idle") dispatch(fetchRecipes());
  }, [status.loadRecipes, dispatch]);

  const VisibleColumnCells = useCallback(
    (recipe: Recipe) =>
      visibleColumns.map((c) => {
        const { value } = TABLE_COLUMNS[c];
        const data = Array.isArray(recipe[value])
          ? recipe[value].join(", ")
          : recipe[value];

        return (
          <TableCell
            className="max-w-[200px] text-ellipsis overflow-hidden"
            key={`recipe-${c}-${recipe.id}`}
          >
            {c === "image" ? (
              <img
                className="size-[45px] rounded-lg"
                src={recipe.image || ""}
                alt={`${recipe.name} recipe image`}
              />
            ) : (
              data
            )}
          </TableCell>
        );
      }),
    [visibleColumns]
  );

  return (
    <section>
      <section
        className={cn(
          "relative max-h-[80vh] rounded-lg border",
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
            {visibleRecipes.length === 0 && (
              <TableRow>
                <TableCell
                  className="text-sm text-muted-foreground h-[250px]"
                  colSpan={visibleColumns.length + 1}
                >
                  {search.query.length > 0 &&
                  status.searchRecipes === "success" ? (
                    <p className="flex-center w-full">No results were found.</p>
                  ) : (
                    <p className="flex-center w-full">
                      No recipes. Create new ones
                    </p>
                  )}
                </TableCell>
              </TableRow>
            )}
            {visibleRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                {VisibleColumnCells(recipe)}

                <TableCell>
                  <Button variant="destructive">
                    <Trash />
                  </Button>
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

      {totalRecipeCount > rowsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>1</PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default RecipeTable;
