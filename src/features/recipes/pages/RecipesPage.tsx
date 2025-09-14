import { RecipeHeader, RecipeTable } from "../components";

const RecipesPage = () => {
  return (
    <section className="flex flex-col gap-5">
      <RecipeHeader />
      <RecipeTable />
    </section>
  );
};

export default RecipesPage;
