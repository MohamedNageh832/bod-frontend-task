import { dispatch } from "@/store";
import { thunks } from "../thunks";

export const fetchRecipes = () => dispatch(thunks.fetchRecipes());
