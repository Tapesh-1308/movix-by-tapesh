import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";
import Container from "../../../components/container/Container";

import "./styles.scss";
import Image from "../../../components/lazyLoading/Image";

const Cast = ({ castData, isLoading }) => {
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <Container>
        <div className="sectionHeading">Top Cast</div>
        {!isLoading ? (
          <div className="listItems">
            {castData?.map((cast) => {
              const imgUrl = cast.profile_path
                ? url.profile + cast.profile_path
                : avatar;
              return (
                <div className="listItem" key={cast.id}>
                  <div className="profileImg">
                    <Image src={imgUrl} />
                  </div>
                  <div className="name">{cast.name}</div>
                  <div className="character">{cast.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cast;
