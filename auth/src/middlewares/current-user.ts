import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
}

//Overriding exisist Request interface so that it takes optional currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.token) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.token,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
