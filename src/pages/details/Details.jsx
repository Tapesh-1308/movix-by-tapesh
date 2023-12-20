import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./styles.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendations from "./carousels/Recommendations";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data: videosData, isLoading: isVideoLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: creditsData, isLoading: isCreditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={videosData?.results[0]} crew={creditsData?.crew} />
      <Cast castData={creditsData?.cast} isLoading={isCreditsLoading}/>
      <VideosSection videosData={videosData} isLoading={isVideoLoading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  );
};

export default Details;
