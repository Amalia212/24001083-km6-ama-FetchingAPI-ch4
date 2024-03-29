import React, { useState } from "react";
import axios from "axios";

const API_KEY = "60234f6ae15d81b2aa5b3f6b1cd6cccc";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectPage, setSelectPage] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectRegion, setSelectRegion] = useState("");

  const searchMovies = async () => {
    try {
      if (query.trim().length === 0) return alert("Mohon inputkan movie");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=${selectLanguage}&page=${selectPage}&year=${selectYear}&region=${selectRegion}`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setMovies(response.data.results);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLanguage = (event) => {
    setSelectLanguage(event.target.value);
  };

  const handlePage = (event) => {
    setSelectPage(event.target.value);
  };

  const handleYear = (event) => {
    setSelectYear(event.target.value);
  };
  const handleRegion = (event) => {
    setSelectRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div>
      <h1 className="text-center my-5 font-bold text-2xl">Movie Search</h1>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form onSubmit={handleSubmit} className="my-5 ms-10">
          <button type="submit" className="bg-blue-400 me-4 p-2 rounded-md">
            Search
          </button>
          <input
            type="text"
            placeholder="Search movie"
            value={query}
            onChange={handleChange}
            className="p-2 border  outline-none focus:border-blue-400 rounded-sm"
          />
          <select onChange={handleLanguage} className="select-cst">
            <option selected disabled>
              Language
            </option>
            <option value="ar-SA">Arabic</option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
          </select>

          <select onChange={handlePage} className="select-cst">
            <option selected disabled>
              Page
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select onChange={handleYear} className="mx-5 select-cst">
            <option selected disabled>
              Range Year
            </option>
            <option value="2021">1900 - 2021</option>
            <option value="2022">1900 - 2022</option>
            <option value="2023">1900 - 2023</option>
          </select>
          <select onChange={handleRegion} className="mx-5 select-cst">
            <option selected disabled>
              Region Release
            </option>
            <option value="SA">Saudi Arabia</option>
            <option value="ID">Indonesia</option>
            <option value="EN">EN</option>
          </select>
        </form>
        <div className="flex flex-wrap justify-center gap-8 pb-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <h2 className="font-bold px-5">{movie.title}</h2>
              <h2>Release date : {movie.release_date}</h2>
              <h2 className="p-4"> Release{movie.overview.slice(0, 150)}...</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;

//CSS
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// body {
//   font-family: "Poppins", "Inter", sans-serif;
// }

// button {
//   @apply text-white;
// }

// .select-cst {
//   @apply bg-slate-800 p-2 mx-5 rounded-md cursor-pointer text-white;
// }
