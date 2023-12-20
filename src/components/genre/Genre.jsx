import { useSelector } from "react-redux";
import "./styles.scss";

const Genre = ({ data = [] }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data.map((id) => {
        if(!genres[id]) return;
        return (
          <div className="genre" key={id}>
            {genres[id]}
          </div>
        );
      })}
    </div>
  );
};

export default Genre;
