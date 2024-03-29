import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FilmIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon,
  FireIcon,
  TicketIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar({ query, setQuery, searchMovies }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="navbar bg-base-100 px-20 py-2 flex items-center justify-between bg-yellow-800 w-full">
      <div className="flex items-center text-white">
        <div className="flex items-center mr-4">
          <FilmIcon width={75} height={75} />
          <span className="ml-2 text-5xl">MovieStar</span>
        </div>
      </div>

      <div className="flex justify-betweend text-white">
        <ul className="menu menu-horizontal px-1 flex justify-end">
          <li className="hover:text-blue-500">
            <HomeIcon width={40} height={40} />
            <Link to={"/"}> Home</Link>
          </li>
          <li className="ml-10 hover:text-blue-500">
            <TicketIcon width={40} height={40} />
            <Link to={"/now-playing"}>
              Now <p>Playing</p>
            </Link>
          </li>
          <li className="ml-10 hover:text-blue-500">
            <FireIcon width={40} height={40} />
            <Link to={"/trending-movie"} className="mr-4">
              Trending <p> Movie</p>
            </Link>
          </li>
          <li className="ml-5 hover:text-blue-500 flex items-center">
            <button onClick={toggleSearch} className="focus:outline-none">
              <MagnifyingGlassCircleIcon width={40} height={40} />
            </button>
            {isSearchVisible && (
              <form
                onSubmit={(e) => {
                  e?.preventDefault();
                  searchMovies();
                }}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value)}
                  type="text"
                  placeholder="Search Movie"
                  className="border border-gray-600 rounded-md px-2 py-1 text-black"
                />
              </form>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
