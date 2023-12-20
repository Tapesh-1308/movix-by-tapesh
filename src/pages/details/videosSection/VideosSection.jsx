import { useState } from "react";
import Container from "../../../components/container/Container";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Image from "../../../components/lazyLoading/Image";
import PlayIcon from "../detailsBanner/PlayIcon";

import "./styles.scss";

const VideosSection = ({ videosData, isLoading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <Container>
        <div className="sectionHeading">Official Videos</div>

        {!isLoading ? (
          <div className="videos">
            {videosData?.results?.map((video) => (
              <div
                className="videoItem"
                key={video.id}
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <div className="videoThumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </Container>
      <VideoPopup show={show} videoId={videoId} hidePopup={hidePopup} />
    </div>
  );
};

export default VideosSection;
