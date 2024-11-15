import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api',
  nodeEnv: process.env.NODE_ENV || 'development',
};
