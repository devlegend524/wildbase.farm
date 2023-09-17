import React, { lazy } from 'react'
import { createBrowserRouter } from "react-router-dom";


const Home = lazy(() => import('pages/Home'))
const Farm = lazy(() => import('pages/Farms'))
const NotFound = lazy(() => import('pages/NotFound'))
// const Presale = lazy(() => import('pages/Presale'))
const Zap = lazy(() => import('pages/Zap'))

const PageRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/farms",
    element: <Farm />,
  },
  {
    path: "/zap",
    element: <Zap />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default PageRouter;
