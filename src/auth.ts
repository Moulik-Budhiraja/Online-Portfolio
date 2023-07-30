import express from "express";
import prisma from "./db";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

export default router;
