import React, { lazy } from 'react'
import { createBrowserRouter } from "react-router-dom";


const Home = lazy(() => import('pages/Home'))
const Farm = lazy(() => import('pages/Farms'))
const NotFound = lazy(() => import('pages/NotFound'))
// const Presale = lazy(() => import('pages/Presale'))
const Zap = lazy(() => import('pages/Zap'))
const Liquidity = lazy(() => import('pages/Liquidity'))

const PageRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "/",
    element: <Farm />,
  },
  {
    path: "/swap",
    element: <Zap />,
  },
  {
    path: "/liquidity",
    element: <Liquidity />,
  },
  {
    path: "*",
    element: <Farm />,
  },
]);

export default PageRouter;
