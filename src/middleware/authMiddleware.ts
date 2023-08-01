import jwt from "jsonwebtoken";
import config from "../config/config";
import prisma from "../db";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/requestTypes";

async function checkAccessValidity(
  accessToken: string | undefined
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!accessToken) {
      return resolve("");
    }

    jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        resolve("");
      } else {
        if (!data || typeof data === "string") {
          new Error("Data is undefined");
          resolve("");
        } else {
          resolve(data.userId);
        }
      }
    });
  });
}

async function checkRefreshValidity(
  refreshToken: string | undefined
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!refreshToken) {
      return resolve("");
    }

    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        resolve("");
      } else {
        if (!data || typeof data === "string") {
          new Error("Data is undefined");
          resolve("");
        } else {
          resolve(data.userId);
        }
      }
    });
  });
}

async function attemptRefresh(req: AuthRequest, res: Response) {
  if (await checkRefreshValidity(req.cookies.refreshToken)) {
    return res.redirect(`/refresh?redirect=${req.originalUrl}`);
  } else {
    return res.redirect("/login");
  }
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.cookies.accessToken;

  const userId = await checkAccessValidity(token);

  if (!userId) {
    const refreshToken: string | undefined = req.cookies.refreshToken;

    if (refreshToken && (await checkRefreshValidity(refreshToken))) {
      return res.redirect(`/refresh?redirect=${req.originalUrl}`);
    } else {
      req.user = undefined;
      return next();
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user === null) {
    return res.sendStatus(400);
  } else {
    req.user = user as unknown as typeof req.user;
  }

  next();
}

export async function authenticateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return attemptRefresh(req, res);
  }

  next();
}

export function authenticateAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return attemptRefresh(req, res);
  }

  if (req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  next();
}

export async function preventAuthenticated(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    return res.redirect("/");
  }

  next();
}
