import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Role } from "@prisma/client";

const auth = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = verifyToken(token) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default auth;
