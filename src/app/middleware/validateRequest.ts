import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

const validateRequest =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.errors });
    }
  };

export default validateRequest;