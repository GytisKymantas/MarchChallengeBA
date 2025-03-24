import React, { createContext, useState } from "react";
import { DEFAULT_GIF, API_URL } from "../utils/constants";
import {
  generateCurrentDate,
  getLocalStorageItem,
  sortByDatetime,
} from "../utils/helpers";

export const GifContext = createContext();

export const GifProvider = ({ children }) => {
  const [gifData, setGifData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGifs = async () => {
    if (loading) return;

    const offset = Math.floor(Math.random() * 100);

    setLoading(true);

    try {
      const response = await fetch(API_URL + `&offset=${offset}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();

      const sortedData = sortByDatetime(data);

      const newArray = sortedData.map((item, index) => {
        const storedData = getLocalStorageItem(index + 1) || null;

        return {
          id: index + 1,
          url:
            storedData?.url ||
            item.featured_gif?.images?.downsized?.url ||
            DEFAULT_GIF,
          import_datetime:
            storedData?.import_datetime ||
            item.featured_gif?.import_datetime ||
            generateCurrentDate(),
        };
      });

      setGifData(newArray);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GifContext.Provider value={{ gifData, loading, fetchGifs }}>
      {children}
    </GifContext.Provider>
  );
};
