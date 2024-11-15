import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import db from './config/db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the Social Network API!');
  });
  
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`🔍 ${req.method} request to ${req.path}`);
    next();
  });
  
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found!' });
  });
  
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
  
  const startServer = async (): Promise<void> => {
    try {
      await db();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
        console.log(`📁 MongoDB connected successfully`);
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  };
  
  process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  
  startServer();
  
  export default app;