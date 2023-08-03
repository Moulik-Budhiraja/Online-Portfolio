import { existsSync, mkdirSync } from "fs";

export default function startup() {
  if (!existsSync("/images")) {
    console.log("Creating images directory...");
    mkdirSync("/images");
  }

  if (!existsSync("/images/full")) {
    console.log("Creating images/full directory...");
    mkdirSync("/images/full");
  }

  if (!existsSync("/images/small")) {
    console.log("Creating images/small directory...");
    mkdirSync("/images/small");
  }

  if (!existsSync("/images/temp")) {
    console.log("Creating images/temp directory...");
    mkdirSync("/images/temp");
  }
}
