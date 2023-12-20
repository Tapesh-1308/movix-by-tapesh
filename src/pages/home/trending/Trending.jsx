import { useState } from "react";
import Container from "../../../components/container/Container";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day")
  
  const {data, isLoading} = useFetch(`/trending/movie/${endPoint}`);

  const onTabChange = (tab) => {setEndPoint(tab === "Day" ? "day" : "week")}

  return (
    <div className="carouselSection">
      <Container>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </Container> 
      <Carousel data={data?.results} isLoading={isLoading}/>
    </div>
  );
};

export default Trending;
