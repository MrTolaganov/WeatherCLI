import fs from "fs";
import os from "os";
import path from "path";

const filePath = path.join(os.homedir(), "weather-data.json");

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExists(filePath)) {
    const file = await fs.promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExists(filePath)) {
    const file = await fs.promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }

  return undefined;
};

const isExists = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
