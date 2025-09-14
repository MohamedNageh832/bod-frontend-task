import { Input } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";

const RecipeHeader = () => {
  return (
    <header className="">
      <Input />

      <Button className="flex gap-1 items-center">
        <Plus /> Create Recipe
      </Button>
    </header>
  );
};

export default RecipeHeader;
