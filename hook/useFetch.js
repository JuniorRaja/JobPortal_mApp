import axios from "axios";
import { useState, useEffect } from "react";
//import { RAPID_API_KEY } from "@env";

const APIKEY = "833f635080msh3af64ec192852c9p1a5e18jsn6a17695feab5";
//const APIKEY = "3eacc72e4amshb5e94d827aaf7acp12ece2jsnec5609b4f77e"; others

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await axios.request(options);

      setData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("Error in API Req");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
