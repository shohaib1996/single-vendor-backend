import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './app/interfaces';
import routes from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import { UploaderRoutes } from './app/modules/uploader/uploader.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use('/api/v1', routes);
app.use('/api/v1', UploaderRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
