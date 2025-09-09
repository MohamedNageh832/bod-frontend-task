const createCrudRoutes = (base: string) => ({
  getAll: base,
  createOne: base,
  getOne: (id: number) => `${base}/${id}`,
  updateOne: (id: number) => `${base}/${id}`,
  deleteOne: (id: number) => `${base}/${id}`,
});

export const ROUTES = {
  home: {
    ui: {
      root: "/",
    },
  },
  recipes: {
    ui: {},
    api: createCrudRoutes("https://dummyjson.com/recipes"),
  },
};
