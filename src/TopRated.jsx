import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

const API_KEY = "5e4a160d88ab953fadaaed22916b8438";

const TopRated = () => {
  const navigate = useNavigate();
  const [rated, setRated] = useState([]);
  const [sortBy, setSortBy] = useState("vote_average.desc");

  const fetchTopRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`
      );
      setRated(response.data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Fungsi untuk menyortir data berdasarkan opsi pengurutan yang dipilih
  const sortMovies = (movies) => {
    switch (sortBy) {
      case "vote_average.desc":
        return movies.sort((a, b) => b.vote_average - a.vote_average);
      case "vote_average.asc":
        return movies.sort((a, b) => a.vote_average - b.vote_average);
      default:
        return movies;
    }
  };

  return (
    <div className="bg-yellow-950">
      <Navbar />
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-yellow-200">
          Top Rated Movies
        </h1>
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2 font-bold text-yellow-200">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="mx-5 py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md"
          >
            <option value="vote_average.desc">Top Rated Descending</option>
            <option value="vote_average.asc">Top Rated Ascending</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {sortMovies(rated).map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate("/DetailTop-Rated", { state: { id: movie.id } });
              }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:bg-gray-800"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl text-white font-semibold mb-2">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-400">
                  Release Date: {movie.release_date}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {movie.overview.slice(0, 150)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TopRated;
