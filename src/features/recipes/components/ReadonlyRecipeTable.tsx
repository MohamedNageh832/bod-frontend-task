import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import type { AppDispatch } from "@/store";
import { cn } from "@/shared/utils";

import { selectRecipes, selectStatus } from "../store";
import { fetchRecipes } from "../thunks";

const RecipeTable = () => {
  const status = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status.loadRecipes !== "idle") return;

    dispatch(fetchRecipes());
  }, [status.loadRecipes, dispatch]);

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
              <TableHead>Name</TableHead>
              <TableHead>Preparation Time (Minutes)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Difficulty</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipes.length === 0 && (
              <TableRow>
                <TableCell
                  className="text-sm text-muted-foreground h-[250px]"
                  colSpan={4}
                >
                  <p className="flex-center w-full">
                    No recipes. Create new ones
                  </p>
                </TableCell>
              </TableRow>
            )}
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{recipe.prepTimeMinutes}</TableCell>
                <TableCell>{recipe.rating}</TableCell>
                <TableCell>{recipe.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {status.loadRecipes === "loading" && (
          <section className="absolute top-0 flex-center gap-2 bg-secondary/50 w-full h-full">
            <Loader2 className="text-brand animate-spin" size={30} />
            <p>Fetching Recipes...</p>
          </section>
        )}
      </section>
    </section>
  );
};

export default RecipeTable;
