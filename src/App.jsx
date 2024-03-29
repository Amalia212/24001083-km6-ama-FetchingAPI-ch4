import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NowPlaying from "./NowPlaying";
import DetailNowPlaying from "./DetailNowPlaying";
import TrendingMovie from "./TrendingMovie";
import DetailTrendingMovie from "./DetailTrendingMovie";
import PopularMovie from "./PopularMovie";
import DetailPopularMovie from "./DetailPopularMovie";
import TopRated from "./TopRated";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/now-playing",
      element: <NowPlaying />,
    },
    {
      path: "/DetailNow-Playing",
      element: <DetailNowPlaying />,
    },
    {
      path: "/trending-movie",
      element: <TrendingMovie />,
    },
    {
      path: "/DetailTrending-Movie",
      element: <DetailTrendingMovie />,
    },
    {
      path: "/popular-movie",
      element: <PopularMovie />,
    },
    {
      path: "/DetailPopular-Movie",
      element: <DetailPopularMovie />,
    },
    {
      path: "/top-rated",
      element: <TopRated />,
    },
  ]);
  return <RouterProvider router={router} />;
}
