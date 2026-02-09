import axios from "axios";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export const getTodayAsteroids = async () => {
  try {
    const res = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`,
    );

    return res.data.near_earth_objects;
  } catch (error) {
    console.error("NASA API Error", error);
    return {};
  }
};
