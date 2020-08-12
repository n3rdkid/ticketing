import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import {
  RequestValidationError,
  BadRequestError,
  validateRequest,
} from "@peuconomia/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be provided!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use!");
    }
    const user = User.build({ email, password });
    await user.save();
    //Generate webtoken
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    //Store in session
    req.session = {
      token,
    };
    res.status(201).json(user);
  }
);

export { router as signUpRouter };
