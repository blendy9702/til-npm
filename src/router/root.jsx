import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/Loading.jsx";
import companyRouter from "./companyrouter.js";
const LazyHome = lazy(() => import("../pages/index.jsx"));
const LazyCompany = lazy(() => import("../pages/company.jsx"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: companyRouter(),
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

export default router;
