import { Request } from "express";
import { Prisma } from "@prisma/client";

export interface AuthRequest extends Request {
  user?: Prisma.UserGetPayload<{}>;
}
