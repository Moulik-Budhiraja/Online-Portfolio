import express from "express";
import prisma from "./db";

const router = express.Router();

router.get("/:filename", async (req, res) => {
  const filename = req.params.filename;

  try {
    const image = await prisma.image.findUnique({
      where: {
        filename: filename,
      },
    });

    if (!image) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    res.sendFile(`${image.id}.${image.filetype}`, {
      root: "images/full",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving image",
    });
  }
});

router.get("/small/:filename", async (req, res) => {
  const filename = req.params.filename;

  try {
    const image = await prisma.image.findUnique({
      where: {
        filename: filename,
      },
    });

    if (!image) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    res.sendFile(`${image.id}.${image.filetype}`, {
      root: "images/small",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving image",
    });
  }
});

export default router;
