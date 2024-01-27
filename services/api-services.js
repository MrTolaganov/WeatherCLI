import axios from "axios";
import { TOKEN_DICTIONARY, getKeyValue } from "./storage-services.js";

const getWeather = async (city) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error("API does not exist, -t [API_TOKEN] save token");
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    }
  );

  return data;
};

export { getWeather };
