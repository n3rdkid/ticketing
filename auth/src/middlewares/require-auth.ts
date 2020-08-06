import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";
//currentUser middleware is assumed to run before this
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
