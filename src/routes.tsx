import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout } from "./shared/layout";
import { lazy } from "react";

const HomePage = lazy(() => import("@/shared/pages/HomePage"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
