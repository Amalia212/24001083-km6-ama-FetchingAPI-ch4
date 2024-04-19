import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilmIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon,
  FireIcon,
  TicketIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar({
  query,
  setQuery,
  searchMovies,
  userData,
  setUserData,
}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Perbarui status isLoggedIn berdasarkan token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Jika token ada, maka setIsLoggedIn menjadi true

    if (userData && userData.name) {
      setIsLoggedIn(true);
    }
  }, [userData]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setUserData(null);
      setIsLoggedIn(false);
      navigate("/login"); // Arahkan ke halaman login setelah logout
    }
  };

  return (
    <div className="navbar bg-base-100 px-20 py-2 flex items-center justify-between bg-yellow-800 w-full">
      <div className="flex items-center text-white">
        <div className="flex items-center mr-4">
          <FilmIcon width={75} height={75} />
          <span className="ml-2 text-5xl">MovieStar</span>
        </div>
      </div>

      <div className="flex justify-end text-white">
        <ul className="menu menu-horizontal px-1 flex justify-end">
          {isLoggedIn ? (
            <>
              <li className="hover:text-yellow-400 flex items-center">
                <HomeIcon width={40} height={40} />
                <Link to="/" className="ml-2">
                  {" "}
                  Home
                </Link>
              </li>
              <li className="ml-10 hover:text-yellow-400 flex items-center">
                <TicketIcon width={40} height={40} />
                <Link to="/now-playing" className="ml-2">
                  Now <p>Playing</p>
                </Link>
              </li>
              <li className="ml-10 hover:text-yellow-400 flex items-center">
                <FireIcon width={40} height={40} />
                <Link to="/trending-movie" className="mr-4">
                  Trending <p>Movie</p>
                </Link>
              </li>
              <li className="ml-5 hover:text-yellow-400 flex items-center">
                <button onClick={toggleSearch} className="focus:outline-none">
                  <MagnifyingGlassCircleIcon width={40} height={40} />
                </button>
                {isSearchVisible && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      searchMovies();
                    }}
                  >
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      placeholder="Search Movie"
                      className="border border-gray-600 rounded-md px-2 py-1 text-black"
                    />
                  </form>
                )}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white text-md hover:text-yellow-400 mt-4 mr-4 ml-7 flex items-center"
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="text-white text-md hover:text-yellow-400">
                <Link to="/register" className="mr-4 flex items-center">
                  <UserCircleIcon width={40} height={40} />
                  <span className="ml-2">REGISTER</span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-md hover:text-yellow-400 mt-3 mr-4 ml-5 flex item-between"
                  to="/login"
                >
                  LOGIN
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
