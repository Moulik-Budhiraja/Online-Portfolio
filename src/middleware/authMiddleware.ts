import jwt from "jsonwebtoken";
import config from "../config/config";
import prisma from "../db";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/requestTypes";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) return res.sendStatus(403);

    if (!data || typeof data === "string") {
      new Error("Data is undefined");
      return res.sendStatus(500);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (user === null) {
      return res.sendStatus(403);
    } else {
      req.user = user as unknown as typeof req.user;
    }

    next();
  });
}

export function authenticateAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  if (req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  next();
}
