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
import type { RootState } from "@/store";
import { Trash } from "lucide-react";
import { useSelector } from "react-redux";

const RecipeTable = () => {
  const state = useSelector((state: RootState) => state.userRecipes);

  return (
    <section>
      <Table>
        <TableHeader>
          <TableHead>Recipe Name</TableHead>
          <TableHead>Preparation Time (Minutes)</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Controls</TableHead>
        </TableHeader>

        <TableBody>
          {state.recipes.map((recipe) => (
            <TableRow>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.prepTimeMinutes}</TableCell>
              <TableCell>{recipe.rating}</TableCell>
              <TableCell>{recipe.difficulty}</TableCell>
              <TableCell>
                <Button>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
