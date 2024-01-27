import getArgs from "./helpers/args.js";
import { getWeather } from "./services/api-services.js";
import {
  TOKEN_DICTIONARY,
  getKeyValue,
  saveKeyValue,
} from "./services/storage-services.js";
import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/log-services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token not found");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    return printSuccess("Token saved");
  } catch (err) {
    return printError(err.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City not found");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    return printSuccess("City saved");
  } catch (err) {
    return printError(err.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const response = await getWeather(city);

    printWeather(response);
  } catch (err) {
    if (err?.response?.status === 404) {
      printError("City not found");
    } else if (err?.response?.status === 401) {
      printError("Invalid token");
    } else {
      printError(err.message);
    }
  }
};

const startCLI = () => {
  const args = getArgs(process.argv);

  // help
  if (args.h) {
    return printHelp();
  }

  // save city
  if (args.s) {
    return saveCity(args.s);
  }

  // save token
  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

startCLI();
