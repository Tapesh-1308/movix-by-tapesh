import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./styles.scss";

import Container from "../../../components/container/Container";
import useFetch from "../../../hooks/useFetch";
import Genre from "../../../components/genre/Genre";
import RatingCircle from "../../../components/ratingCircle/RatingCircle";
import Image from "../../../components/lazyLoading/Image";
import VideoPopup from "../../../components/videoPopup/VideoPopup"
import PosterFallback from "../../../assets/no-poster.png";
import PlayIcon from "./PlayIcon";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const directors = crew?.filter((obj) => obj.job === "Director");
  const writers = crew?.filter((obj) =>
    ["Screenplay", "Story", "Writer"].includes(obj.job)
  );

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  
  return (
    <div className="detailsBanner">
      {!isLoading && !!data ? (
        <>
          <div className="backdrop-img">
            <Image src={url.backdrop + data.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <Container>
            <div className="content">
              <div className="left">
                <Image
                  src={url.poster + data.poster_path || PosterFallback}
                  className="posterImg"
                />
              </div>
              <div className="right">
                <div className="title">
                  {data.name || data.title}
                  {` [${dayjs(data.release_date).format("YYYY")}]`}
                </div>
                <div className="subtitle">{data.tagline}</div>
                <Genre data={data.genres?.map((obj) => obj.id)} />

                <div className="row">
                  <RatingCircle rating={data.vote_average.toFixed(1)} />
                  <div className="playIcon" onClick={() => {
                    setShow(true);
                    setVideoId(video?.key)
                  }}>
                    <PlayIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>

                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data.overview}</div>
                </div>

                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                {directors && directors.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <div className="text">
                      {directors.map((director, idx) => (
                        <span key={idx}>
                          {director.name}
                          {idx < directors.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {writers && writers.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <div className="text">
                      {writers.map((writer, idx) => (
                        <span key={idx}>
                          {writer.name}
                          {idx < writers.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data?.created_by && data?.created_by.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <div className="text">
                      {data?.created_by.map((creator, idx) => (
                        <span key={idx}>
                          {creator.name}
                          {idx < data?.created_by.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup show={show} videoId={videoId} hidePopup={hidePopup}/>
          </Container>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <Container>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
