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
import type { AppDispatch, RootState } from "@/store";
import { Loader2, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecipes } from "../async-reducers/addFetchUserRecipeCases";
import { selectUserRecipes } from "../store/userRecipeSlice";
import { cn } from "@/shared/utils";

const RecipeTable = () => {
  const state = useSelector((state: RootState) => state.userRecipes);
  const recipes = useSelector(selectUserRecipes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (state.status.loadUserRecipes === "idle") dispatch(fetchUserRecipes());
  }, [state.status.loadUserRecipes]);

  return (
    <section>
      <section
        className={cn(
          "relative h-[80vh] rounded-lg",
          state.status.loadUserRecipes === "loading"
            ? "overflow-hidden"
            : "overflow-auto"
        )}
      >
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Recipe Name</TableHead>
              <TableHead>Preparation Time (Minutes)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Controls</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{recipe.prepTimeMinutes}</TableCell>
                <TableCell>{recipe.rating}</TableCell>
                <TableCell>{recipe.difficulty}</TableCell>
                <TableCell>
                  <Button variant="destructive">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {state.status.loadUserRecipes === "loading" && (
          <section className="absolute top-0 flex-center gap-2 bg-secondary/50 w-full h-full">
            <Loader2 className="text-brand animate-spin" size={40} />{" "}
            <p>Loading...</p>
          </section>
        )}
      </section>

      {state.totalRecipeCount > state.rowsPerPage && (
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
