import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../utils/api"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setData(null);
            setIsError(false);

            try {
                const res = await fetchDataFromApi(url);
                setData(res);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, isError };
}

export default useFetch