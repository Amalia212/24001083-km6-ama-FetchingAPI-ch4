import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const REACT_APP_BASEIMGURL = "https://image.tmdb.org/t/p/w500";
  const API_KEY = "5e4a160d88ab953fadaaed22916b8438";
  const screenWidht = window.innerWidth;
  const elementRef = useRef();
  const [movies, setMovies] = useState([]);

  //TRENDING MOVIES
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
        console.log("response data ", response.data);
        setMovies(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchMovies();
  }, []);

  const sliderRight = (element) => {
    element.scrollLeft += screenWidht - 120;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidht - 120;
  };

  return (
    <div>
      <div className="absolute w-screen h-[310px] flex justify-between items-center">
        <div className="hidden md:block text-white  mx-8 cursor-pointer  ">
          <ArrowLeftCircleIcon
            width={50}
            height={50}
            onClick={() => sliderLeft(elementRef.current)}
          />
        </div>
        <div className="hidden md:block text-white  mx-8 cursor-pointer">
          <ArrowRightCircleIcon
            width={50}
            height={50}
            onClick={() => sliderRight(elementRef.current)}
          />
        </div>
      </div>
      <div
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth"
        ref={elementRef}
      >
        {movies.map((item, index) => (
          <img
            src={REACT_APP_BASEIMGURL + item.backdrop_path}
            key={index}
            className="min-w-full md:h-[310px] object-cover object-left-center mr-5 rounded-md hover:border-[6px] border-gray-500 transition-all duration-150 ease-in"
          />
        ))}
      </div>
    </div>
  );
}
