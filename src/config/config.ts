import path from "path";
import dotenv from "dotenv";

dotenv.config();

interface ENV {
  ACCESS_TOKEN_SECRET: string | undefined;
  REFRESH_TOKEN_SECRET: string | undefined;
  DATABASE_URL: string | undefined;
}

interface Config {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  DATABASE_URL: string;
}

const getENV = (): ENV => {
  return {
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
