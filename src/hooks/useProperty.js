import axios from "axios";
import { apiURL } from "../config";
import { useState } from "react";

const useProperty = () => {
  const [loading, setLoading] = useState(true);

  const getInitialProperties = async (query, filters = {}) => {
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
