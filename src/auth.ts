import express, { Response } from "express";
import prisma from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config";
import {
  authenticateToken,
  authenticateUser,
  preventAuthenticated,
} from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";

const router = express.Router();

router.get(
  "/register",
  preventAuthenticated,
  (req: AuthRequest, res: Response) => {
    res.render("auth/register");
  }
);

router.post("/register", async (req, res) => {
  // Check if a user with the same email exists
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    res.status(409).json({
      error: "User with this email already exists",
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      error: "Password must be at least 8 characters",
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      auth: {
        create: {
          passwordHash: hashedPassword,
        },
      },
    },
  });

  console.log(newUser);

  res.json({
    user: newUser,
  });
});

router.get(
  "/login",
  preventAuthenticated,
  (req: AuthRequest, res: Response) => {
    res.render("auth/login");
  }
);

router.post("/login", async (req, res) => {
  // Check if a user with the same email exists

  const email = req.body.email;
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      auth: true,
    },
  });

  if (!user || !user.auth) {
    res.status(404).json({
      error: "User with this email does not exist",
    });
    return;
  }

  // Check if the password is correct
  const passwordHash = user.auth.passwordHash;

  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
  if (!isPasswordCorrect) {
    res.status(401).json({
      error: "Incorrect password",
    });
    return;
  }

  // Create a JWT
  const accessToken = jwt.sign(
    { userId: user.id },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    config.REFRESH_TOKEN_SECRET
  );

  // Store the refresh token in the database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

router.get("/refresh", async (req, res) => {
  const redirect = req.query.redirect;
  const refreshToken: string | null = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const token = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!token) {
    return res.sendStatus(400);
  }

  jwt.verify(token.token, config.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(401);
    if (!data || typeof data === "string") {
      new Error("Data is undefined");
      return res.sendStatus(500);
    }

    const accessToken = jwt.sign(
      { userId: data.userId },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    if (redirect) {
      return res.redirect(redirect as string);
    } else {
      return res.redirect("/");
    }
  });
});

router.delete("/logout", authenticateUser, async (req: AuthRequest, res) => {
  const refreshToken: string | undefined = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const token = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!token) {
    return res.sendStatus(400);
  }

  await prisma.refreshToken.delete({
    where: {
      token: refreshToken,
    },
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.sendStatus(204);
});

router.delete(
  "/logout/all",
  authenticateUser,
  async (req: AuthRequest, res) => {
    if (!req.user) {
      return res.sendStatus(400);
    }

    await prisma.refreshToken.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.sendStatus(204);
  }
);

export default router;
