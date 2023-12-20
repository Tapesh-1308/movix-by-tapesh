import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import PosterFallback from "../../assets/no-poster.png";
import "./styles.scss";
import Container from "../container/Container";
import Image from "../lazyLoading/Image";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import RatingCircle from "../ratingCircle/RatingCircle";
import Genre from "../genre/Genre";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ title, data, isLoading, endpoint }) => {
  const { url } = useSelector((state) => state.home);
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  if(data && data.length === 0) 
    return;

  return (
    <div className="carousel">
      <Container>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {isLoading ? (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterURL = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Image src={posterURL} />
                    <RatingCircle rating={item.vote_average.toFixed(1)} />
                    <Genre data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Carousel;
