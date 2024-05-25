import { config } from 'dotenv';

config();

const APP_CONFIG = {
  API: {
    PORT: process.env.PORT || 3000,
  },
  DB: {
    HOST: process.env.DB_HOST,
    PORT: parseFloat(process.env.DB_PORT!),
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
};
export default APP_CONFIG;
