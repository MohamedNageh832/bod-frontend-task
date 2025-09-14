import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout } from "./shared/layout";
import { lazy } from "react";
import { ProtectedRoute } from "./features/auth/components";
import { ROUTES } from "./shared/constants";

const SignInPage = lazy(() => import("@/features/auth/pages/SignInPage"));
const HomePage = lazy(() => import("@/shared/pages/HomePage"));
const RecipesPage = lazy(() => import("@/features/recipes/pages/RecipesPage"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.auth.ui.signIn} element={<SignInPage />} />

        <Route path={ROUTES.home.ui.root} element={<ProtectedRoute />}>
          <Route path={ROUTES.home.ui.root} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.recipes.ui.root} element={<RecipesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
