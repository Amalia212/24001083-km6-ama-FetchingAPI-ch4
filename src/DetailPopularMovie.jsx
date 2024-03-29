import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "5e4a160d88ab953fadaaed22916b8438";

export default function PopularMovieDetail() {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);
  const detailPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setDetail(response.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    detailPopularMovies();
  }, []);
  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm	 ">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
            alt={detail?.title}
            className="w-auto h-auto  rounded-lg"
          />
          <div
            className="text-white font-sans bg-gray-600/75 rounded-xl shadow-lg p-10 "
            key={detail?.id}
          >
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-2">{detail?.title}</h2>
              <p className="text-lg mb-2 border-b-2 pb-3 ">
                {detail?.overview}
              </p>
              <p className="text-lg">Release Date: {detail?.release_date}</p>
              <p className="text-lg">
                Vote Average: {parseFloat(detail?.vote_average).toFixed(1)}/10
              </p>
              <p className="text-lg">Votes: {detail?.vote_count}</p>
              <p className="text-lg">
                Budget:{" "}
                {detail?.budget
                  ? `$${detail?.budget.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">
                Revenue:{" "}
                {detail?.revenue
                  ? `$${detail?.revenue.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">Runtime: {detail?.runtime} Minutes</p>
              <p className="text-lg">
                Genres: {detail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <button
                className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-00 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={() => {
                  navigate("/popular-movie", { state: { id: detail?.id } });
                }}
              >
                <div className="w-15 h-5">
                  <span className="align-middle font-semibold">
                    Back to Now Playing
                  </span>
                </div>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
