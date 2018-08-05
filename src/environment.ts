require('dotenv').config();

const commonvars = {
  apiUrl: process.env.API_URL,
  dataApiUrl: process.env.DATA_API_ENDPOINT,
  clientUrl: process.env.CLIENT_URL,
  dbEndpoint: process.env.DATABASE_ENDPOINT,
  dbName: process.env.DATABASE_NAME,
};

const secrets = {
  youtubeId: process.env.YOUTUBE_ID,
  youtubeSecret: process.env.YOUTUBE_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbPem: process.env.DATABASE_PEM,
};

export const environment = {
  settings: commonvars,
  secrets: secrets,
};
