import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

const API_KEY = "5e4a160d88ab953fadaaed22916b8438";

const PlayingNow = () => {
  const navigate = useNavigate();
  const [playings, setPlaying] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sortBy}`
      );
      setPlaying(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Menambahkan fungsi untuk menyortir data berdasarkan opsi pengurutan yang dipilih
  const sortMovies = (movies) => {
    switch (sortBy) {
      case "popularity.desc":
        return movies.sort((a, b) => b.popularity - a.popularity);
      case "popularity.asc":
        return movies.sort((a, b) => a.popularity - b.popularity);
      case "release_date.desc":
        return movies.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "release_date.asc":
        return movies.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "original_title.asc":
        return movies.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
      case "original_title.desc":
        return movies.sort((a, b) => {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        });
      default:
        return movies;
    }
  };

  return (
    <div className="bg-yellow-950">
      <Navbar />
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mt-8 mb-4  text-yellow-200">
          Now Playing Movies
        </h1>
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2 font-bold  text-yellow-200">
            Urutkan berdasarkan:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="mx-5 py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md"
          >
            <option value="popularity.desc">Populer (Descending)</option>
            <option value="popularity.asc">Populer (Ascending)</option>
            <option value="release_date.desc">Tanggal Rilis (Terbaru)</option>
            <option value="release_date.asc">Tanggal Rilis (Terlama)</option>
            <option value="original_title.asc">Judul (A-Z)</option>
            <option value="original_title.desc">Judul (Z-A)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {sortMovies(playings).map((playing) => (
            <div
              key={playing.id}
              onClick={() => {
                navigate("/DetailNow-Playing", { state: { id: playing.id } });
              }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:bg-gray-800 transition duration-300 hover:filter hover:grayscale hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${playing.poster_path}`}
                alt={playing.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl text-white font-semibold mb-2">
                  {playing.title}
                </h2>
                <p className="text-sm text-gray-400">
                  Release Date: {playing.release_date}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {playing.overview.slice(0, 150)}
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

export default PlayingNow;
