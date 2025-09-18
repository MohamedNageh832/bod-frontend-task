import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { TABLE_COLUMNS } from "../constants";
import { selectVisibleColumns, updateVisibleColumns } from "../store";
import type { Recipe } from "../validation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";

const VisibleColumnsDropdown = () => {
  const visibleColumns = useSelector(selectVisibleColumns);
  const dispatch = useDispatch<AppDispatch>();

  const handleVisibleColumnsChange =
    (name: keyof Recipe) => (checked: boolean) => {
      dispatch(updateVisibleColumns({ [name]: checked }));
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Visible columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3 p-5" align="end">
        <h4 className="text-base font-bold">Visible Columns</h4>

        <section className="flex flex-col gap-2">
          {Object.entries(TABLE_COLUMNS).map(([, colOptions]) => (
            <section
              className="flex items-center gap-2"
              key={`visible-column-${colOptions.value}`}
            >
              <Checkbox
                id={colOptions.value}
                name={colOptions.value}
                checked={visibleColumns.includes(colOptions.value)}
                onCheckedChange={handleVisibleColumnsChange(colOptions.value)}
              />
              <label htmlFor={colOptions.value}>{colOptions.text}</label>
            </section>
          ))}
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibleColumnsDropdown;
