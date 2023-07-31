import express from "express";
import prisma from "./db";
import {
  authenticateToken,
  authenticateAdmin,
} from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";
import { Response } from "express";

const router = express.Router();

router.get(
  "/",
  [authenticateToken, authenticateAdmin],
  (req: AuthRequest, res: Response) => {
    console.log(req.user);
    res.render("admin/index");
  }
);

export default router;
