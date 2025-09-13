import { dispatch } from "@/store";
import { thunks } from "../thunks";

export const executeSearch = (q: string) => dispatch(thunks.executeSearch(q));
