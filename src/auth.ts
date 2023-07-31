import express from "express";
import prisma from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config";
import { authenticateToken } from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register");
});

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
      Auth: {
        create: {
          passwordHash: hashedPassword,
        },
      },
    },
  });

  console.log(newUser);

  res.json(newUser);
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  // Check if a user with the same email exists

  const email = req.body.email;
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      Auth: true,
    },
  });

  if (!user) {
    res.status(404).json({
      error: "User with this email does not exist",
    });
    return;
  }

  if (!user.Auth) {
    res.status(404).json({
      error: "User with this email does not exist",
    });
    return;
  }

  // Check if the password is correct
  const passwordHash = user.Auth.passwordHash;

  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
  if (!isPasswordCorrect) {
    res.status(401).json({
      error: "Incorrect password",
    });
    return;
  }

  // Create a JWT
  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    config.ACCESS_TOKEN_SECRET
  );

  return res.status(200).json({
    accessToken: accessToken,
  });
});

export default router;
