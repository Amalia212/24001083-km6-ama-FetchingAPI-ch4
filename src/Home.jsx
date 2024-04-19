import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import SearchResult from "./SearchResult";

export default function Home() {
  const API_KEY = "5e4a160d88ab953fadaaed22916b8438";
  const [movies, setMovies] = useState([]);
  const [rated, setRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [playings, setPlaying] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState("");
  const slider = useRef(null);

  const searchMovies = async () => {
    console.log("search movie di enter");
    try {
      if (query.trim().length === 0) return alert("Mohon inputkan movie");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setResultSearch(response.data.results);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const topRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      setRated(response.data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    topRated();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setTrending(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchMovies();
  }, []);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      setPlaying(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  async function upcomingMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const items = await response.json();
      setUpcoming(items.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    upcomingMovies();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  async function fetchUserData(token) {
    try {
      const response = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch user data");
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function getUserData() {
    const token = localStorage.getItem("token");
    const userData = await fetchUserData(token);
    console.log("TOKENN", token);
    console.log("userrrrrrr", userData);
    if (userData) {
      setUserData(userData);
      console.log("User data:", userData);
    } else {
      console.log("Failed to fetch user data");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-yellow-950">
      <Navbar
        query={query}
        setQuery={setQuery}
        searchMovies={searchMovies}
        userData={userData}
        setUserData={setUserData}
      />
      {query?.length === 0 ? (
        <div>
          <Header />
          <div>
            {userData && userData.name ? ( // Memeriksa apakah userData dan userData.name memiliki nilai
              <h1 className="text-2xl font-bold text-red-100 ml-12 text-center">
                Selamat Datang {userData.name}!
                {userData.data &&
                  userData.data.name &&
                  `(${userData.data.name})`}
                {/* Menampilkan pesan selamat datang dengan nama pengguna */}
              </h1>
            ) : (
              <h1 className="text-2xl font-bold text-red-100 ml-12 text-center">
                Selamat Datang
                {/* Menampilkan pesan bahwa data pengguna sedang dimuat */}
              </h1>
            )}
          </div>

          <div className="slider-container px-16">
            <h2 className="text-2xl text-yellow-200 font-black my-4">
              Now Playing
            </h2>
            <Slider
              {...settings}
              ref={slider}
              className="rounded-md overflow-hidden"
            >
              {playings?.map((e) => (
                <div key={e?.id} className="px-2">
                  <div className="flex justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
                      alt={e?.title}
                      className="rounded-md hover:border-[10px] border-gray-400 transition-all duration-150 ease-in"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <Link
              to="/now-playing"
              className="text-white mt-4 flex justify-end"
            >
              <ArrowRightEndOnRectangleIcon width={30} height={30} />
            </Link>
            <h2 className="text-2xl text-yellow-200 font-black my-4">
              Popular Movies
            </h2>
            <Slider
              {...settings}
              ref={slider}
              className="rounded-md overflow-hidden"
            >
              {movies?.map((e) => (
                <div key={e?.id} className="px-2">
                  <div className="flex justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
                      alt={e?.title}
                      className="rounded-md hover:border-[10px] border-gray-400 transition-all duration-150 ease-in"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <Link
              to="/popular-movie"
              className="text-white mt-4 flex justify-end"
            >
              <ArrowRightEndOnRectangleIcon width={30} height={30} />
            </Link>
            <h2 className="text-2xl text-yellow-200 font-black mb-4 mt-5">
              Top Rated
            </h2>
            <Slider
              {...settings}
              ref={slider}
              className="rounded-md overflow-hidden"
            >
              {rated?.map((e) => (
                <div key={e?.id} className="px-2">
                  <div className="flex justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
                      alt={e?.title}
                      className="rounded-md hover:border-[10px] border-gray-400 transition-all duration-150 ease-in"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <Link to="/top-rated" className="text-white mt-4 flex justify-end">
              <ArrowRightEndOnRectangleIcon width={30} height={30} />
            </Link>
            <h2 className="text-2xl text-yellow-200 font-black my-4 mt-5">
              Trending Movies
            </h2>
            <Slider
              {...settings}
              ref={slider}
              className="rounded-md overflow-hidden"
            >
              {trending?.map((e) => (
                <div key={e?.id} className="px-2">
                  <div className="flex justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
                      alt={e?.title}
                      className="rounded-md hover:border-[10px] border-gray-400 transition-all duration-150 ease-in"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <Link
              to="/trending-movie"
              className="text-white mt-4 flex justify-end"
            >
              <ArrowRightEndOnRectangleIcon width={30} height={30} />
            </Link>
            <h2 className="text-2xl text-yellow-200 font-black my-4 mt-5">
              Upcoming Movies
            </h2>
            <Slider
              {...settings}
              ref={slider}
              className="rounded-md overflow-hidden"
            >
              {upcoming?.map((e) => (
                <div key={e?.id} className="px-2">
                  <div className="flex justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`}
                      alt={e?.title}
                      className="rounded-md hover:border-[10px] border-gray-400 transition-all duration-150 ease-in"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <Link
              to="/upcoming-movie"
              className="text-white mt-4 flex justify-end"
            >
              <ArrowRightEndOnRectangleIcon width={30} height={30} />
            </Link>
          </div>
        </div>
      ) : (
        <SearchResult resultSearch={resultSearch} />
      )}
      <Footer />
    </div>
  );
}
