import type { FC } from "react";
import type { Recipe } from "../validation";
import { TableCell } from "@/shared/components/ui";

type RecipeTableCellProps = {
  data: Recipe;
  column: keyof Recipe;
};

const RecipeTableCell: FC<RecipeTableCellProps> = (props) => {
  const { data, column } = props;
  const value = Array.isArray(data[column])
    ? data[column].join(", ")
    : data[column];

  return (
    <TableCell className="max-w-[200px] text-ellipsis overflow-hidden">
      {column === "image" ? (
        <img
          className="size-[45px] rounded-lg"
          src={data.image || ""}
          alt={`${data.name} recipe image`}
        />
      ) : (
        value
      )}
    </TableCell>
  );
};

export default RecipeTableCell;
