import type { Recipe } from "@/features/recipes";
import { CommandItem } from "@/shared/components/ui";
import { Image, Star, UtensilsCrossed } from "lucide-react";
import type { FC } from "react";

type RecipeProps = {
  data: Recipe;
};

const RecipeItem: FC<RecipeProps> = (props) => {
  const { data } = props || {};

  return (
    <CommandItem className="flex gap-3">
      <section className="w-[150px] aspect-[3/2] rounded-lg overflow-hidden shrink-0">
        {data.image ? (
          <img
            className="size-full"
            src={data.image}
            alt={`${data.name} recipe image`}
          />
        ) : (
          <Image className="size-full" />
        )}
      </section>

      <section className="flex flex-col gap-2 w-full">
        <h3 className="text-lg font-bold">{data.name}</h3>
        {data.instructions.length > 0 && (
          <ul className="flex flex-col text-sm text-muted-foreground">
            {data.instructions.slice(0, 1).map((step, i) => (
              <li className="flex gap-1" key={`nav-recipe-istructions-${i}`}>
                <UtensilsCrossed className="mt-[2px]" />
                {step}
              </li>
            ))}
            <li>...</li>
          </ul>
        )}
        <section className="flex gap-2 justify-between">
          <p>{data.prepTimeMinutes} Mins</p>
          <p className="text-muted-foreground">{data.mealType}</p>
          <section className="flex gap-1 items-center">
            <Star />
            <p>{data.rating}</p>
          </section>
        </section>
      </section>
    </CommandItem>
  );
};

export default RecipeItem;
