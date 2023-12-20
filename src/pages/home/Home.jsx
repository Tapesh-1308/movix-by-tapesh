import HomeBanner from "./HomeBanner/HomeBanner";
import Popular from "./popular/Popular";
import Trending from "./trending/Trending";

import "./styles.scss";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HomeBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
