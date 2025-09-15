import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui";
import { Plus, Search } from "lucide-react";
import { TABLE_COLUMNS } from "../constants";
import type { Recipe } from "../validation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  selectSearch,
  selectVisibleColumns,
  updateSearchQuery,
  updateVisibleColumns,
} from "../store";
import { useEffect, type ChangeEvent } from "react";
import { searchRecipes } from "../thunks";
import { useDebounce } from "@/shared/hooks";

const RecipeHeader = () => {
  const search = useSelector(selectSearch);
  const visibleColumns = useSelector(selectVisibleColumns);
  const dispatch = useDispatch<AppDispatch>();
  const debounced = useDebounce(search.query);

  useEffect(() => {
    dispatch(searchRecipes());
  }, [debounced, dispatch]);

  const handleVisibleColumnsChange =
    (name: keyof Recipe) => (checked: boolean) => {
      dispatch(updateVisibleColumns({ [name]: checked }));
    };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <section className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground">
        <Search size={16} />
        <Input
          value={search.query}
          className="w-[300px] max-w-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search recipes"
          onChange={handleSearch}
        />
      </section>

      <Button className="flex gap-1 items-center">
        <Plus /> Create Recipe
      </Button>

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
    </header>
  );
};

export default RecipeHeader;
