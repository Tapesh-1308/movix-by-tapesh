import { useState } from "react";
import Container from "../../../components/container/Container";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/carousel/Carousel";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie")
  
  const {data, isLoading} = useFetch(`/${endPoint}/popular`);

  const onTabChange = (tab) => {setEndPoint(tab === "Movies" ? "movie" : "tv")}

  return (
    <div className="carouselSection">
      <Container>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TvShows"]} onTabChange={onTabChange} />
      </Container> 
      <Carousel data={data?.results} isLoading={isLoading} endpoint={endPoint}/>
    </div>
  );
};

export default Popular;
