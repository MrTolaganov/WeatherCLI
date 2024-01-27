import chalk from "chalk";
import dedent from "dedent-js";

const printError = (err) => {
  console.log(chalk.bgRed("ERROR") + " " + err);
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + msg);
};

const printHelp = () => {
  console.log(dedent`
${chalk.bgCyan("HELP")}
-s [CITY] enter city
-h help
-t [API_TOKEN] save token
    `);
};

const printWeather = (res) => {
  console.log(dedent`
  ${chalk.bgYellowBright("WEATHER")} City weather ${res.name}
  Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
  Humidity: ${res.main.humidity}%
  Wind speed: ${res.wind.speed}
  `);
};

export { printError, printSuccess, printHelp, printWeather };
