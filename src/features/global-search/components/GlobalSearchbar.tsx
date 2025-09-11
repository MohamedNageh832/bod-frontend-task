import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/shared/components/ui";
import { useClickOutside, useDebounce } from "@/shared/hooks";
import RecipeItem from "./RecipeItem";
import { useSelector } from "react-redux";
import { useGlobalSearchActions } from "../hooks";
import {
  selectError,
  selectIsSearching,
  selectQuery,
  selectResults,
} from "../slice";

const GlobalSearchbar = () => {
  const query = useSelector(selectQuery);
  const isSearching = useSelector(selectIsSearching);
  const error = useSelector(selectError);
  const results = useSelector(selectResults);

  const debounced = useDebounce(query, 300);
  const { updateQuery, executeSearch } = useGlobalSearchActions();
  const commandRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    (async () => {
      if (debounced.trim().length < 3) return;
      executeSearch(debounced);
    })();
  }, [debounced, executeSearch]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  useClickOutside(commandRef, () => setIsFocused(false));

  return (
    <Command
      ref={commandRef}
      className=" relative w-[500px] max-w-full py-1 bg-muted overflow-visible"
      shouldFilter={false}
    >
      <CommandInput
        className=""
        placeholder="Search..."
        onValueChange={updateQuery}
        onFocus={handleFocus}
      />

      {isFocused && (
        <CommandList className="absolute top-[115%] left-0 w-full z-10 p-2 rounded-lg shadow bg-background ">
          {query.trim().length < 3 ? (
            <CommandEmpty className="text-muted-foreground">
              Type at least 3 letters to search!
            </CommandEmpty>
          ) : isSearching ? (
            <CommandEmpty>
              <Loader2 className="animate-spin text-brand" />
              <p>Searching...</p>
            </CommandEmpty>
          ) : (
            <CommandEmpty>{error || "No results were found."}</CommandEmpty>
          )}

          {results.length > 0 && (
            <CommandGroup>
              {results.map((result, i) => (
                <RecipeItem key={`global-search-result-${i}`} data={result} />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default GlobalSearchbar;
