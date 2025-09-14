const createCrudRoutes = (base: string) => ({
  getAll: base,
  createOne: base,
  getOne: (id: number) => `${base}/${id}`,
  updateOne: (id: number) => `${base}/${id}`,
  deleteOne: (id: number) => `${base}/${id}`,
  search: (q: string) => `${base}/search?q=${q}`,
});

export const ROUTES = {
  home: {
    ui: {
      root: "/",
    },
  },
  recipes: {
    ui: {
      root: "/recipes",
    },
    api: createCrudRoutes("https://dummyjson.com/recipes"),
  },
};
