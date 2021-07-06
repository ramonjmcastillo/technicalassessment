import axios from "axios";
import { apiURL } from "../config";
import { useState, useEffect } from "react";

const useProperty = () => {
  const [loading, setLoading] = useState(false);

  const getInitialProperties = async (query, filters = {}) => {
    console.log("i am calling the api");
    console.log("give me the query", query);
    try {
      setLoading(true);
      const { data } = await axios.get(apiURL, {
        params: { ...filters, limit: query },
      });
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    getInitialProperties,
  };
};

export default useProperty;
