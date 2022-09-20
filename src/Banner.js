import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  console.log(movie);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        (await request).data.results[
          Math.floor(Math.random() * (await request).data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/*title*/}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/*div > 2 buuton */}
        <div className="banner__buttons">
          <button className="banner__button">play</button>
          <button className="banner__button">My List</button>
        </div>

        {/*discription */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadebottom" />
    </header>
  );
}

export default Banner;
