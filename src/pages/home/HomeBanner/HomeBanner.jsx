import { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Image from "../../../components/lazyLoading/Image";
import Container from "../../../components/container/Container";

const HomeBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { data, isLoading } = useFetch("/movie/popular");

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    if (data && data.results) {
      const randomIdx = Math.floor(Math.random() * 20);
      const bgUrl = url.backdrop + data.results[randomIdx]?.backdrop_path;

      setBackground(bgUrl);
    }
  }, [data, url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <div className="heroBanner">
      {!isLoading && <div className="backdrop-img">
        <Image src={background} />
      </div>}

      <div className="opacity-layer"></div>
      <Container>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore Now.
          </span>

          <form
            onSubmit={handleSubmit}
            className="searchInput"
          >
            <input
              type="text"
              placeholder="Search for a movie or a tv show...."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">search</button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default HomeBanner;
