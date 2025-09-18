import { Button } from "@/shared/components/ui";
import { Trash } from "lucide-react";

const RecipeTableControls = () => {
  return (
    <Button variant="destructive">
      <Trash />
    </Button>
  );
};

export default RecipeTableControls;
