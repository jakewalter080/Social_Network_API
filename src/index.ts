import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import connectDB from './config/db';
import routes from './routes/api';
import { ErrorResponse } from './types';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Social Network API! 🚀');
});

app.use('/api', routes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found! 😢' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  const errorResponse: ErrorResponse = {
    message: err.message || 'Internal server error',
  };

  if (config.nodeEnv === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(500).json(errorResponse);
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(config.port, () => {
      console.log(`
        Server is running!
        Listening on port ${config.port}
        http://localhost:${config.port}
        Environment: ${config.nodeEnv}
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

startServer();

export default app;