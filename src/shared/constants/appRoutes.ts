import { parsedEnv } from "../config";

const createCrudRoutes = (base: string) => ({
  getAll: base,
  createOne: base,
  getOne: (id: number) => `${base}/${id}`,
  updateOne: (id: number) => `${base}/${id}`,
  deleteOne: (id: number) => `${base}/${id}`,
  search: (q: string) => `${base}/search?q=${q}`,
});

const BASE_URL = parsedEnv.VITE_BACKEND_URL;

export const ROUTES = {
  auth: {
    ui: {
      signIn: "/sign-in",
    },
    api: {
      signIn: `${BASE_URL}/auth/login`,
      me: `${BASE_URL}/auth/me`,
      refresh: `${BASE_URL}/auth/refresh`,
    },
  },
  home: {
    ui: {
      root: "/",
    },
  },
  recipes: {
    ui: {
      root: "/recipes",
    },
    api: createCrudRoutes(`${BASE_URL}/recipes`),
  },
};
