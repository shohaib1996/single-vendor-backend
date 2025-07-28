import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use('/api/v1', routes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
