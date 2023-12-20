import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then(({ images }) => {
      const url = {
        backdrop: images.secure_base_url + "original",
        poster: images.secure_base_url + "original",
        profile: images.secure_base_url + "original",
      };
  
      dispatch(getApiConfiguration(url));
    });
  };

  const fetchGenres = async () => {
    try {
      const endPoints = ["tv", "movie"];
      const genresData = {};
  
      
      await Promise.all(
        endPoints.map(async (type) => {
          const { genres } = await fetchDataFromApi(`/genre/${type}/list`);
          genres.forEach((obj) => (genresData[obj.id] = obj.name));
        })
      );
  
      dispatch(getGenres(genresData));
    } catch (error) {
      
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
