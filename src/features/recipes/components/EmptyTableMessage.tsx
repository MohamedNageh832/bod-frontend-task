import { TableCell, TableRow } from "@/shared/components/ui";
import { useSelector } from "react-redux";
import { selectStatus, selectVisibleColumns } from "../store";
import { useRecipeQueryParams } from "../hooks";

const EmptyTableMessage = () => {
  const status = useSelector(selectStatus);
  const visibleColumns = useSelector(selectVisibleColumns);
  const { q } = useRecipeQueryParams();

  return (
    <TableRow>
      <TableCell
        className="text-sm text-muted-foreground h-[250px]"
        colSpan={visibleColumns.length + 1}
      >
        {q.length > 0 && status.searchRecipes === "success" ? (
          <p className="flex-center w-full">No results were found.</p>
        ) : (
          <p className="flex-center w-full">No recipes. Create new ones</p>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableMessage;
