import path from "path";
import dotenv from "dotenv";

dotenv.config();

interface ENV {
  NODE_ENV: string | undefined;
  MYSQL_PORT: string | undefined;
  MYSQL_HOST: string | undefined;
  MYSQL_USER: string | undefined;
  MYSQL_PASSWORD: string | undefined;
  MYSQL_DATABASE: string | undefined;
  VOLUME_PATH: string | undefined;
  ACCESS_TOKEN_SECRET: string | undefined;
  REFRESH_TOKEN_SECRET: string | undefined;
  DATABASE_URL: string | undefined;
}

interface Config {
  NODE_ENV: string;
  MYSQL_PORT: string;
  MYSQL_HOST: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  VOLUME_PATH: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  DATABASE_URL: string;
}

const getENV = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    VOLUME_PATH: process.env.VOLUME_PATH,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  };
};

const getConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
  }

  return config as Config;
};

const env = getENV();
const config = getConfig(env);

export default config;
