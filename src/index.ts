import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;