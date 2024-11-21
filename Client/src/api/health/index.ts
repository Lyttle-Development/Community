import express, { Request, Response } from 'express';

export const createHealthServer = () => {
  const app = express();

  // Define the /api/health endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  return app;
};
