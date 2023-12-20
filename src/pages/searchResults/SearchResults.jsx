import { useEffect, useState } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import Container from "../../components/container/Container";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import noResults from "../../assets/no-results.png"

const SearchResults = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        setData(res);
        setPage((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }

        setPage((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPage(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial />}
      {!loading && (
        <Container>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                loader={<Spinner />}
                next={fetchNextPageData}
                dataLength={data?.results?.length || []}
                hasMore={page <= data?.total_pages}
              >
                {data?.results.map((item, idx) => {
                  if (item.media_type === "person") return;

                  return (
                    <MovieCard
                      key={idx}
                      data={item}
                      fromSearch
                      mediaType={item.media_type}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="noResultContainer">
              <img src={noResults} alt="" />
              <span className="resultNotFound">No Results Found</span>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default SearchResults;
